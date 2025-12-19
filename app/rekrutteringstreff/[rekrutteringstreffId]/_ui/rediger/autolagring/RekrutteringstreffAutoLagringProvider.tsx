'use client';

import { useLagreInnlegg } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/lagring/useLagreInnlegg';
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
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
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
  const { lagre: lagreInnlegg } = useLagreInnlegg();
  const { tittelKiFeil, innleggKiFeil } = useRekrutteringstreffValidering();

  const harKiFeil = Boolean(tittelKiFeil || innleggKiFeil);

  const autoLagringAktiv = Boolean(
    erIEditModus && treff && !erPublisert(treff.status as any),
  );

  const lagre = useCallback(async () => {
    await lagreRekrutteringstreff();
    await lagreInnlegg();
  }, [lagreRekrutteringstreff, lagreInnlegg]);

  return (
    <AutoLagre<FieldValues>
      form={form}
      onLagre={lagre}
      autoLagringAktiv={autoLagringAktiv}
      sisteLagretInitialt={treff?.sistEndret ?? null}
      harKiFeil={harKiFeil}
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

interface StatusProps {
  lagretTekst?: string;
}

export const RekrutteringstreffAutoLagreStatus = ({
  lagretTekst,
}: StatusProps) => {
  const {
    autoLagringAktiv,
    harKiFeil,
    lagreNaa,
    lagrer,
    venterPåLagring,
    statusTekst,
  } = useRekrutteringstreffAutoLagre();

  if (!autoLagringAktiv) {
    return lagretTekst ? (
      <span className='text-xs text-gray-600' aria-live='polite'>
        {lagretTekst}
      </span>
    ) : null;
  }

  const ikon = harKiFeil ? (
    <ExclamationmarkTriangleIcon title='KI-feil' />
  ) : lagrer || venterPåLagring ? (
    <Loader size='xsmall' title='Lagrer' />
  ) : (
    <FloppydiskIcon />
  );

  const kanTrykke = !(lagrer || venterPåLagring) && !harKiFeil;

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
      {lagretTekst && <span className='text-gray-600'>{lagretTekst}</span>}
    </div>
  );
};
