'use client';

import { useRekrutteringstreffAutoLagre } from './autolagring/RekrutteringstreffAutoLagringProvider';
import { useLagreRekrutteringstreff } from './hooks/lagring/useLagreRekrutteringstreff';
import { erEditMode, erPublisert } from './hooks/utils';
import { useOppdaterKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useKiValidering } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type FeltType = 'tittel' | 'innlegg';

const sanitizeForComparison = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const SILENT_UPDATE = {
  shouldDirty: false,
  shouldValidate: false,
  shouldTouch: false,
} as const;

/**
 * Hook for skjemafelt med KI-validering av rekrutteringstreff.
 *
 * Validerer tekst (tittel/innlegg) mot NAVs retningslinjer ved onBlur.
 * Viser KI-analyse hvis innholdet bryter retningslinjer, og lar bruker godkjenne.
 * Lagrer automatisk når validering er OK eller etter godkjenning.
 */
export function useFormFeltMedKiValidering({
  feltType,
  fieldName,
  savedValue,
  onUpdated,
}: {
  feltType: FeltType;
  fieldName: string;
  savedValue?: string | null;
  onUpdated?: () => void;
}) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const { lagreNaa, autoLagringAktiv } = useRekrutteringstreffAutoLagre();
  const { lagre: lagreRekrutteringstreff } = useLagreRekrutteringstreff();
  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
  } = useFormContext();

  const { setLagret: setKiLagret } = useOppdaterKiLogg(rekrutteringstreffId);
  const {
    trigger: validateKI,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useKiValidering(rekrutteringstreffId);

  const [loggId, setLoggId] = useState<string | null>(null);
  const [harGodkjentKiFeil, setHarGodkjentKiFeil] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const watchedValue = useWatch({ control, name: fieldName });
  const normalisertVerdi = sanitizeForComparison(watchedValue);
  const normalisertLagretVerdi = sanitizeForComparison(savedValue);
  const harEndringer = normalisertVerdi !== normalisertLagretVerdi;

  const erRedigeringAvPublisertTreff =
    erPublisert(treff as any) && erEditMode();

  const bryterRetningslinjer =
    !!analyse && !analyseError && !!(analyse as any)?.bryterRetningslinjer;

  const kiErrorBorder = bryterRetningslinjer && !harGodkjentKiFeil;
  const showAnalysis = hasChecked && bryterRetningslinjer && !harGodkjentKiFeil;

  const flushRekrutteringstreffFørKiBlokk = useCallback(() => {
    if (feltType === 'innlegg' && autoLagringAktiv) {
      lagreRekrutteringstreff().catch((error) => {
        new RekbisError({
          message: 'Lagring av rekrutteringstreff feilet under flush før KI-blokk.',
          error,
        });
      });
    }
  }, [feltType, autoLagringAktiv, lagreRekrutteringstreff]);

  useEffect(() => {
    if (!harEndringer) return;

    flushRekrutteringstreffFørKiBlokk();

    setHasChecked(false);
    setHarGodkjentKiFeil(false);
    setLoggId(null);
    resetAnalyse();
    setValue(`${fieldName}KiSjekket`, false, SILENT_UPDATE);
  }, [
    harEndringer,
    resetAnalyse,
    fieldName,
    setValue,
    flushRekrutteringstreffFørKiBlokk,
  ]);

  useEffect(() => {
    const feil = bryterRetningslinjer && !harGodkjentKiFeil;
    setValue(`${fieldName}KiFeil`, feil, SILENT_UPDATE);
  }, [bryterRetningslinjer, harGodkjentKiFeil, setValue, fieldName]);

  const markerKiLoggSomLagret = useCallback(
    async (id: string) => {
      if (!setKiLagret) return;
      try {
        await setKiLagret({ id, lagret: true });
      } catch (error) {
        new RekbisError({
          message: `Feil ved oppdatering av /lagret for logg ${id}.`,
          error,
        });
      }
    },
    [setKiLagret],
  );

  const oppdaterStateEtterValidering = useCallback(
    (
      nyLoggId: string | null,
      bryterRetningslinjerResultat: boolean,
      settKiSjekket: boolean = true,
    ) => {
      setLoggId(nyLoggId);
      setHasChecked(true);

      if (nyLoggId) {
        setValue(`${fieldName}KiLoggId`, nyLoggId, SILENT_UPDATE);
      }

      if (settKiSjekket) {
        setValue(`${fieldName}KiSjekket`, true, SILENT_UPDATE);
      }
      setValue(
        `${fieldName}KiFeil`,
        bryterRetningslinjerResultat,
        SILENT_UPDATE,
      );
    },
    [setValue, fieldName],
  );

  const validerMedKiOgLagreVedGodkjenning = useCallback(async () => {
    const feltErGyldig = await triggerRHF(fieldName as any);
    if (!feltErGyldig) return;

    const tekstVerdi = String(getValues(fieldName) ?? '').trim();
    const normalisertTekst = sanitizeForComparison(tekstVerdi);
    if (!normalisertTekst) return;

    if (savedValue !== undefined) {
      if (normalisertTekst === sanitizeForComparison(savedValue)) return;
    }

    try {
      const kiResultat = await validateKI({ feltType, tekst: tekstVerdi });
      const nyLoggId = (kiResultat as any)?.loggId ?? null;
      const bryterRetningslinjerResultat = !!(kiResultat as any)
        ?.bryterRetningslinjer;

      if (!bryterRetningslinjerResultat && autoLagringAktiv) {
        // Sett state uten kiSjekket, lagre, så sett kiSjekket - unngår dobbeltlagring
        oppdaterStateEtterValidering(
          nyLoggId,
          bryterRetningslinjerResultat,
          false,
        );
        await lagreNaa();
        setValue(`${fieldName}KiSjekket`, true, SILENT_UPDATE);
        if (nyLoggId) {
          await markerKiLoggSomLagret(nyLoggId);
        }
      } else {
        oppdaterStateEtterValidering(
          nyLoggId,
          bryterRetningslinjerResultat,
          true,
        );
      }
    } catch (error) {
      new RekbisError({ message: 'KI-validering feilet', error });
      setHasChecked(true);
      setValue(`${fieldName}KiSjekket`, true, SILENT_UPDATE);
    }
  }, [
    triggerRHF,
    fieldName,
    getValues,
    validateKI,
    feltType,
    oppdaterStateEtterValidering,
    lagreNaa,
    markerKiLoggSomLagret,
    setValue,
    savedValue,
    autoLagringAktiv,
  ]);

  const onGodkjennKiFeil = useCallback(async () => {
    setHarGodkjentKiFeil(true);
    setHasChecked(true);
    setValue(`${fieldName}KiSjekket`, true, SILENT_UPDATE);
    setValue(`${fieldName}KiFeil`, false, SILENT_UPDATE);

    if (!autoLagringAktiv) {
      onUpdated?.();
      return;
    }

    await lagreNaa();
    if (loggId) {
      await markerKiLoggSomLagret(loggId);
    }
  }, [
    autoLagringAktiv,
    loggId,
    markerKiLoggSomLagret,
    fieldName,
    setValue,
    lagreNaa,
  ]);

  return {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    harGodkjentKiFeil,
    setHarGodkjentKiFeil,
    loggId,
    hasChecked,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    validerMedKiOgLagreVedGodkjenning,
    onGodkjennKiFeil,
    watchedValue,
    control,
    setValue,
    getValues,
  };
}
