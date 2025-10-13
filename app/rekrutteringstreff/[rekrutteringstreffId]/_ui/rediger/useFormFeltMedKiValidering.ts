'use client';

import { erEditMode, erPublisert } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { useEffect, useState, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type FeltType = 'tittel' | 'innlegg';

/** Fjerner HTML-tags og normaliserer whitespace for sammenligning */
const sanitizeForComparison = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export function useFormFeltMedKiValidering({
  feltType,
  fieldName,
  savedValue,
  saveCallback,
  onUpdated,
  requireHasCheckedToShow = false,
}: {
  feltType: FeltType;
  fieldName: string;
  savedValue?: string | null;
  saveCallback: (
    fieldsToValidate: string[],
    overstyrKiFeil?: boolean,
  ) => Promise<void>;
  onUpdated?: () => void;
  requireHasCheckedToShow?: boolean;
}) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
  } = useFormContext();

  const { setLagret: setKiLagret, isLoading: kiLoggLoading } = useKiLogg(
    rekrutteringstreffId,
    feltType,
  );

  const watchedValue = useWatch({ control, name: fieldName });

  const erRedigeringAvPublisertTreff =
    erPublisert(treff as any) && erEditMode();

  const {
    trigger: validateKI,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff(rekrutteringstreffId);

  const [loggId, setLoggId] = useState<string | null>(null);
  const [harGodkjentKiFeil, setHarGodkjentKiFeil] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Reset state når felt-verdien endres
  useEffect(() => {
    setHasChecked(false);
    setHarGodkjentKiFeil(false);
    setLoggId(null);
    resetAnalyse();
    setValue(`${fieldName}KiSjekket` as any, false as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }, [watchedValue, resetAnalyse, fieldName, setValue]);

  // Sett border-feil hvis KI finner brudd (og bruker ikke har godkjent feilen)
  const kiErrorBorder =
    !!analyse &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !harGodkjentKiFeil;

  // Synkroniser KI-feil til form state (skjul feil hvis bruker har godkjent)
  useEffect(() => {
    const feil =
      !!analyse &&
      !analyseError &&
      !!(analyse as any)?.bryterRetningslinjer &&
      !harGodkjentKiFeil;
    setValue(`${fieldName}KiFeil` as any, feil as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }, [analyse, analyseError, harGodkjentKiFeil, fieldName, setValue]);

  const wrappedSaveCallback = useCallback(
    async (overstyrKiFeil?: boolean) => {
      try {
        await saveCallback([fieldName], overstyrKiFeil);
      } catch (error) {
        new RekbisError({
          message: `Lagring av ${feltType} feilet.`,
          error,
        });
      } finally {
        onUpdated?.();
      }
    },
    [saveCallback, fieldName, feltType, onUpdated],
  );

  const runValidationAndMaybeSave = useCallback(async () => {
    const feltErGyldig = await triggerRHF(fieldName as any);
    if (!feltErGyldig) return;

    const feltVerdi = getValues(fieldName as any);
    const tekstVerdi = (
      typeof feltVerdi === 'string' ? feltVerdi : String(feltVerdi ?? '')
    ).trim();
    const normalisertTekst = sanitizeForComparison(tekstVerdi);

    if (!normalisertTekst) return;

    // Sjekk om innholdet er uendret
    if (savedValue !== undefined) {
      const normalisertLagretVerdi = sanitizeForComparison(savedValue);
      const innholdErUendret = normalisertTekst === normalisertLagretVerdi;
      if (innholdErUendret) return;
    }

    try {
      const kiResultat = await validateKI({
        feltType,
        tekst: tekstVerdi,
      });

      setHasChecked(true);
      setValue(`${fieldName}KiSjekket` as any, true as any, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });

      const loggId =
        (kiResultat as any)?.loggId ?? (analyse as any)?.loggId ?? null;
      setLoggId(loggId);

      const bryterRetningslinjer =
        (kiResultat as any)?.bryterRetningslinjer ??
        (analyse as any)?.bryterRetningslinjer;

      if (!bryterRetningslinjer && !erRedigeringAvPublisertTreff) {
        await wrappedSaveCallback();

        if (loggId && setKiLagret) {
          try {
            await setKiLagret({ id: loggId, lagret: true });
          } catch (error) {
            new RekbisError({
              message: `Feil ved oppdatering av /lagret for logg ${loggId}.`,
              error,
            });
          }
        }
      }
    } catch (error) {
      new RekbisError({ message: 'Validation failed:', error });
      setHasChecked(true);
      setValue(`${fieldName}KiSjekket` as any, true as any, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });
    }
  }, [
    triggerRHF,
    fieldName,
    getValues,
    validateKI,
    feltType,
    erRedigeringAvPublisertTreff,
    wrappedSaveCallback,
    setKiLagret,
    analyse,
    setValue,
    savedValue,
  ]);

  const onGodkjennKiFeil = useCallback(async () => {
    if (erRedigeringAvPublisertTreff) {
      setHarGodkjentKiFeil(true);
      return;
    }

    setHarGodkjentKiFeil(true);
    await wrappedSaveCallback(true);

    if (loggId && setKiLagret) {
      try {
        await setKiLagret({ id: loggId, lagret: true });
      } catch (error) {
        new RekbisError({
          message: `Feil ved oppdatering av /lagret for logg ${loggId}.`,
          error,
        });
      }
    }
  }, [erRedigeringAvPublisertTreff, wrappedSaveCallback, loggId, setKiLagret]);

  const bryterRetningslinjerFlag =
    !!analyse && !analyseError && !!(analyse as any)?.bryterRetningslinjer;

  const showAnalysis = requireHasCheckedToShow
    ? hasChecked && bryterRetningslinjerFlag
    : bryterRetningslinjerFlag;

  return {
    // KI-analyse resultater
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

    // Callbacks
    runValidationAndMaybeSave,
    onGodkjennKiFeil,

    // Form state
    watchedValue,
    control,
    setValue,
    getValues,
    kiLoggLoading,
  };
}
