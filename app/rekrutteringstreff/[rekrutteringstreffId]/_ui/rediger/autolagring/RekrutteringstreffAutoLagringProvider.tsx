'use client';

import { useLagreRekrutteringstreff } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/lagring/useLagreRekrutteringstreff';
import { erPublisert } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/utils';
import { useRekrutteringstreffValidering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/validering/useRekrutteringstreffValidering';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import AutoLagre, {
  AutoLagreRenderState,
} from '@/components/autolagre/AutoLagre';
import {
  ExclamationmarkTriangleIcon,
  FloppydiskIcon,
} from '@navikt/aksel-icons';
import { Button, Loader } from '@navikt/ds-react';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

interface ProviderProps {
  children: ReactNode;
  erIEditModus: boolean;
}

type AutoLagreContextValue =
  | (AutoLagreRenderState<FieldValues> & {
      autoLagringAktiv: boolean;
      harKiFeil: boolean;
    })
  | null;

const RekrutteringstreffAutoLagreContext =
  createContext<AutoLagreContextValue>(null);

const defaultAutoLagreState: AutoLagreRenderState<FieldValues> & {
  autoLagringAktiv: boolean;
  harKiFeil: boolean;
} = {
  lagreNaa: async () => undefined,
  lagrer: false,
  venterPåLagring: false,
  feil: null,
  sisteLagret: null,
  harUlagredeEndringer: false,
  statusTekst: 'Autolagring utilgjengelig',
  skjemaVerdier: () => ({}),
  kiSjekket: true,
  autoLagringAktiv: false,
  harKiFeil: false,
};

export const RekrutteringstreffAutoLagreProvider = ({
  children,
  erIEditModus,
}: ProviderProps) => {
  const form = useFormContext<FieldValues>();
  const { treff } = useRekrutteringstreffData();
  const { lagre: lagreRekrutteringstreff } = useLagreRekrutteringstreff();
  const { tittelKiFeil, innleggKiFeil, tittelKiSjekket, innleggKiSjekket } =
    useRekrutteringstreffValidering();

  const harKiFeil = Boolean(tittelKiFeil || innleggKiFeil);
  const alleKiSjekket = Boolean(tittelKiSjekket && innleggKiSjekket);

  const autoLagringAktiv = Boolean(
    erIEditModus && treff && !erPublisert(treff.status as any),
  );

  const lagre = useCallback(async () => {
    // Lagre kun rekrutteringstreff-data (ikke innlegg)
    // Innlegg lagres separat via KI-validering ved blur
    await lagreRekrutteringstreff();
  }, [lagreRekrutteringstreff]);

  return (
    <AutoLagre<FieldValues>
      form={form}
      onLagre={lagre}
      autoLagringAktiv={autoLagringAktiv}
      sisteLagretInitialt={treff?.sistEndret ?? null}
      harKiFeil={harKiFeil}
      kiSjekket={alleKiSjekket}
    >
      {(state) => (
        <RekrutteringstreffAutoLagreContext.Provider
          value={{ ...state, autoLagringAktiv, harKiFeil }}
        >
          {children}
        </RekrutteringstreffAutoLagreContext.Provider>
      )}
    </AutoLagre>
  );
};

export const useRekrutteringstreffAutoLagre = () => {
  const context = useContext(RekrutteringstreffAutoLagreContext);
  return context ?? defaultAutoLagreState;
};

export const RekrutteringstreffAutoLagreStatus = () => {
  const {
    autoLagringAktiv,
    harKiFeil,
    lagreNaa,
    lagrer,
    venterPåLagring,
    statusTekst,
    kiSjekket,
  } = useRekrutteringstreffAutoLagre();

  if (!autoLagringAktiv) {
    return (
      <span
        className='inline-flex h-8 items-center text-xs text-[var(--ax-text-neutral-subtle)]'
        aria-live='polite'
      >
        {statusTekst}
      </span>
    );
  }

  const ikon = harKiFeil ? (
    <ExclamationmarkTriangleIcon title='KI-feil' />
  ) : lagrer || venterPåLagring ? (
    <Loader size='xsmall' title='Lagrer' />
  ) : (
    <FloppydiskIcon />
  );

  const kanTrykke = !(lagrer || venterPåLagring) && !harKiFeil && kiSjekket;

  return (
    <div className='flex items-center gap-2 text-xs' aria-live='polite'>
      <Button
        icon={ikon}
        size='xsmall'
        variant='tertiary'
        onClick={() => {
          void lagreNaa();
        }}
        disabled={!kanTrykke}
      >
        {statusTekst}
      </Button>
    </div>
  );
};
