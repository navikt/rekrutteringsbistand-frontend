'use client';

import { useLagreInnlegg } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/lagring/useLagreRekrutteringstreff';
import { erPublisert } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/utils';
import { useRekrutteringstreffValidering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/hooks/validering/useRekrutteringstreffValidering';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import AutoLagre, {
  AutoLagreRenderState,
} from '@/components/autolagre/AutoLagre';
import { RekbisError } from '@/util/rekbisError';
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
  const { lagre: lagreInnlegg } = useLagreInnlegg();
  const { tittelKiFeil, innleggKiFeil, tittelKiSjekket, innleggKiSjekket } =
    useRekrutteringstreffValidering();

  // Autolagring blokkeres (for hele skjemaet) hvis tittel har KI-feil eller ikke er sjekket.
  // Feil i innlegg blokkeres separat i lagre-funksjonen, slik at man fortsatt kan lagre endringer i f.eks. tid/sted.
  const tittelHarKiFeil = Boolean(tittelKiFeil);
  const tittelErKiSjekket = Boolean(tittelKiSjekket);

  const autoLagringAktiv = Boolean(
    erIEditModus && treff && !erPublisert(treff.status as any),
  );

  const lagre = useCallback(async () => {
    await lagreRekrutteringstreff();

    const kiFeilNå = form.getValues('htmlContentKiFeil' as any);
    const kiSjekketNå = form.getValues('htmlContentKiSjekket' as any);
    const skalSkippeInnlegg = Boolean(kiFeilNå || kiSjekketNå === false);

    if (!skalSkippeInnlegg) {
      try {
        await lagreInnlegg();
      } catch (error) {
        throw new RekbisError({
          message:
            'Rekrutteringstreffet ble lagret, men lagring av innlegget feilet.',
          error,
        });
      }
    }
  }, [lagreRekrutteringstreff, lagreInnlegg, form]);

  return (
    <AutoLagre<FieldValues>
      form={form}
      onLagre={lagre}
      autoLagringAktiv={autoLagringAktiv}
      sisteLagretInitialt={treff?.sistEndret ?? null}
      harKiFeil={tittelHarKiFeil} // Kun tittel — innlegg håndteres i lagre()
      kiSjekket={tittelErKiSjekket} // Kun tittel — innlegg håndteres i lagre()
    >
      {({ kiSjekket: tittelKiSjekketFraAutoLagre, ...state }) => (
        <RekrutteringstreffAutoLagreContext.Provider
          value={{
            ...state,
            autoLagringAktiv,
            harKiFeil: Boolean(tittelKiFeil || innleggKiFeil),
            kiSjekket: tittelKiSjekketFraAutoLagre && innleggKiSjekket, // TODO: Vurder å endre propnavn til kiBlokkererAutolagring
          }}
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
    feil,
  } = useRekrutteringstreffAutoLagre();

  const kiValideringsFeil = feil?.includes('KI_VALIDERING_MANGLER')
    ? 'Venter på KI-validering'
    : feil?.includes('KI_TEKST_ENDRET')
      ? 'Tekst endret - venter på ny KI-validering'
      : feil?.includes('KI_KREVER_BEKREFTELSE')
        ? 'KI-advarsel må bekreftes'
        : null;

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

  const harValideringsFeil = kiValideringsFeil !== null;
  const venterPåKi = !kiSjekket;
  const venterPåKiTekst = venterPåKi ? 'Venter på KI-validering' : null;
  const ikon =
    harKiFeil || harValideringsFeil ? (
      <ExclamationmarkTriangleIcon title='KI-feil' />
    ) : (lagrer || venterPåLagring) && !venterPåKi ? (
      <Loader size='xsmall' title='Lagrer' />
    ) : (
      <FloppydiskIcon />
    );

  const kanTrykke =
    !(lagrer || venterPåLagring) &&
    !harKiFeil &&
    kiSjekket &&
    !harValideringsFeil;
  const visTekst = kiValideringsFeil ?? venterPåKiTekst ?? statusTekst;

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
        {visTekst}
      </Button>
    </div>
  );
};
