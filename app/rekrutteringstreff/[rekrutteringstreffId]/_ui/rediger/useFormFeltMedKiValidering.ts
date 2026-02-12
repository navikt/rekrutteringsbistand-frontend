'use client';

import { useLagreInnlegg } from './hooks/lagring/useLagreInnlegg';
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
 * Bruker klikker «Sjekk og lagre» for å trigge KI-validering.
 * Hvis OK → lagrer umiddelbart. Hvis brudd → viser analyse + «Lagre likevel».
 * Autolagring er deaktivert for KI-felt — kiSjekket brukes til å indikere at
 * feltet er sjekket av KI, slik at autolagring av andre felt (datoer, sted)
 * ikke blokkeres når KI-sjekken er utført.
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
  const { lagre: lagreRekrutteringstreff } = useLagreRekrutteringstreff();
  const { lagre: lagreInnlegg } = useLagreInnlegg();
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
  } = useKiValidering(rekrutteringstreffId, feltType);

  const [loggId, setLoggId] = useState<string | null>(null);
  const [harGodkjentKiFeil, setHarGodkjentKiFeil] = useState(false);
  const [sjekketVerdi, setSjekketVerdi] = useState<string | null>(null);
  const [prevHarEndringer, setPrevHarEndringer] = useState(false);
  const [harForlattUtenSjekk, setHarForlattUtenSjekk] = useState(false);
  const [prevNormalisertVerdi, setPrevNormalisertVerdi] = useState<string>('');

  const watchedValue = useWatch({ control, name: fieldName });
  const normalisertVerdi = sanitizeForComparison(watchedValue);
  const normalisertLagretVerdi = sanitizeForComparison(savedValue);
  const harEndringer =
    savedValue !== undefined && normalisertVerdi !== normalisertLagretVerdi;
  const hasChecked = sjekketVerdi !== null && normalisertVerdi === sjekketVerdi;

  if (harEndringer !== prevHarEndringer) {
    setPrevHarEndringer(harEndringer);
    if (harEndringer) {
      setSjekketVerdi(null);
      setHarGodkjentKiFeil(false);
      setLoggId(null);
      setHarForlattUtenSjekk(false);
      resetAnalyse();
    } else {
      setHarForlattUtenSjekk(false);
    }
  }

  if (normalisertVerdi !== prevNormalisertVerdi) {
    setPrevNormalisertVerdi(normalisertVerdi);
    if (sjekketVerdi !== null && normalisertVerdi !== sjekketVerdi) {
      setSjekketVerdi(null);
      setHarGodkjentKiFeil(false);
      setLoggId(null);
      resetAnalyse();
    }
  }

  const erRedigeringAvPublisertTreff =
    !!treff && erPublisert(treff.status) && erEditMode();

  const bryterRetningslinjer =
    !!analyse && !analyseError && !!analyse.bryterRetningslinjer;

  const kiErrorBorder = bryterRetningslinjer && !harGodkjentKiFeil;
  const showAnalysis = hasChecked && bryterRetningslinjer && !harGodkjentKiFeil;
  const visSjekkPåminnelse =
    harForlattUtenSjekk && harEndringer && !hasChecked && !validating;
  const sjekkKnappTekst = erRedigeringAvPublisertTreff
    ? 'Sjekk og bruk'
    : 'Sjekk og lagre';

  const sjekkKnappId = `${fieldName}-ki-sjekk-knapp`;

  const onKiFeltBlur = useCallback(
    (e?: React.FocusEvent) => {
      if (e?.relatedTarget?.id === sjekkKnappId) return;
      if (harEndringer && !hasChecked && !validating) {
        setHarForlattUtenSjekk(true);
      }
    },
    [harEndringer, hasChecked, validating, sjekkKnappId],
  );

  useEffect(() => {
    if (!harEndringer) {
      setValue(`${fieldName}KiSjekket`, true, SILENT_UPDATE);
      setValue(`${fieldName}KiFeil`, false, SILENT_UPDATE);
      return;
    }
    setValue(`${fieldName}KiSjekket`, hasChecked && !validating, SILENT_UPDATE);
  }, [harEndringer, fieldName, setValue, hasChecked, validating]);

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

  const lagreFelt =
    feltType === 'innlegg' ? lagreInnlegg : lagreRekrutteringstreff;

  const sjekkOgLagre = useCallback(async () => {
    const feltErGyldig = await triggerRHF(fieldName);
    if (!feltErGyldig) return;

    const tekstVerdi = String(getValues(fieldName) ?? '').trim();
    const normalisertTekst = sanitizeForComparison(tekstVerdi);
    if (!normalisertTekst) return;

    if (savedValue !== undefined) {
      if (normalisertTekst === sanitizeForComparison(savedValue)) return;
    }

    resetAnalyse();

    try {
      const kiResultat = await validateKI({ feltType, tekst: tekstVerdi });
      const nyLoggId = kiResultat?.loggId ?? null;
      const bryterRetningslinjerResultat = !!kiResultat?.bryterRetningslinjer;

      setLoggId(nyLoggId);
      setSjekketVerdi(normalisertTekst);
      setHarForlattUtenSjekk(false);

      if (nyLoggId) {
        setValue(`${fieldName}KiLoggId`, nyLoggId, SILENT_UPDATE);
      }

      setValue(
        `${fieldName}KiFeil`,
        bryterRetningslinjerResultat,
        SILENT_UPDATE,
      );

      if (!bryterRetningslinjerResultat) {
        if (!erRedigeringAvPublisertTreff) {
          await lagreFelt();
          if (nyLoggId) {
            await markerKiLoggSomLagret(nyLoggId);
          }
          onUpdated?.();
        }
      }
    } catch (error) {
      new RekbisError({ message: 'KI-validering feilet', error });
      setSjekketVerdi(normalisertTekst);
    }
  }, [
    triggerRHF,
    fieldName,
    getValues,
    resetAnalyse,
    validateKI,
    feltType,
    setValue,
    lagreFelt,
    markerKiLoggSomLagret,
    savedValue,
    onUpdated,
    erRedigeringAvPublisertTreff,
  ]);

  const onGodkjennKiFeil = useCallback(async () => {
    setHarGodkjentKiFeil(true);
    setValue(`${fieldName}KiFeil`, false, SILENT_UPDATE);
    setValue(`${fieldName}KiSjekket`, true, SILENT_UPDATE);

    if (!erRedigeringAvPublisertTreff) {
      await lagreFelt();
      if (loggId) {
        await markerKiLoggSomLagret(loggId);
      }
      onUpdated?.();
    }
  }, [
    loggId,
    markerKiLoggSomLagret,
    fieldName,
    setValue,
    lagreFelt,
    onUpdated,
    erRedigeringAvPublisertTreff,
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
    harEndringer,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    sjekkKnappTekst,
    sjekkKnappId,
    visSjekkPåminnelse,
    onKiFeltBlur,
    sjekkOgLagre,
    onGodkjennKiFeil,
    watchedValue,
    control,
    setValue,
    getValues,
  };
}
