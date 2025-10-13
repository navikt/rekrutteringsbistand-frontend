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

/**
 * Hovedhook som håndterer KI-validering og lagring for et form-felt.
 * Brukes av både TittelForm og InnleggForm.
 *
 * Håndterer:
 * - Form state (watch, setValue, getValues)
 * - KI-validering mot backend
 * - Autosave-logikk
 * - Force-save ved KI-feil
 * - Logging av KI-resultater
 */
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
  saveCallback: (fieldsToValidate: string[], force?: boolean) => Promise<void>;
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
  const [forceSave, setForceSave] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Reset state når felt-verdien endres
  useEffect(() => {
    setHasChecked(false);
    setForceSave(false);
    setLoggId(null);
    resetAnalyse();
    setValue(`${fieldName}KiSjekket` as any, false as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }, [watchedValue, resetAnalyse, fieldName, setValue]);

  // Sett border-feil hvis KI finner brudd
  const kiErrorBorder =
    !!analyse &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !forceSave;

  // Synkroniser KI-feil til form state
  useEffect(() => {
    const feil =
      !!analyse &&
      !analyseError &&
      !!(analyse as any)?.bryterRetningslinjer &&
      !forceSave;
    setValue(`${fieldName}KiFeil` as any, feil as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }, [analyse, analyseError, forceSave, fieldName, setValue]);

  // Wrapper for saveCallback som håndterer feil og kaller onUpdated
  const wrappedSaveCallback = useCallback(
    async (force?: boolean) => {
      try {
        await saveCallback([fieldName], force);
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

  /** Kjører KI-validering og autosave hvis godkjent (ikke i publisert redigeringsmodus) */
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

      const kanLagres = !bryterRetningslinjer || forceSave;

      // Lagre hvis godkjent (ikke i publisert redigeringsmodus)
      if (kanLagres && !erRedigeringAvPublisertTreff) {
        await wrappedSaveCallback(false);

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
    forceSave,
    erRedigeringAvPublisertTreff,
    wrappedSaveCallback,
    setKiLagret,
    analyse,
    setValue,
    savedValue,
  ]);

  /** Tvinger lagring selv om KI-analyse fant brudd på retningslinjer */
  const onForceSave = useCallback(async () => {
    if (erRedigeringAvPublisertTreff) {
      setForceSave(true);
      return;
    }

    setForceSave(true);
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
    forceSave,
    setForceSave,
    loggId,
    hasChecked,
    showAnalysis,
    erRedigeringAvPublisertTreff,

    // Callbacks
    runValidationAndMaybeSave,
    onForceSave,

    // Form state
    watchedValue,
    control,
    setValue,
    getValues,
    kiLoggLoading,
  };
}
