'use client';

import { erEditMode, erPublisert } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { useEffect, useState, useCallback } from 'react';
import {
  UseFormGetValues,
  UseFormTrigger,
  UseFormSetValue,
} from 'react-hook-form';

export type FeltType = 'tittel' | 'innlegg';

interface UseKiAnalyseParams<FormValues extends Record<string, any>> {
  feltType: FeltType;
  fieldName: keyof FormValues & string;
  watchedValue: any;
  triggerRHF: UseFormTrigger<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  setKiFeilFieldName: keyof FormValues & string;
  saveCallback: (force?: boolean) => Promise<void>;
  setKiLagret?: (args: { id: string; lagret: boolean }) => Promise<void>;
  requireHasCheckedToShow?: boolean;
  setKiSjekketFieldName?: keyof FormValues & string;
  savedValue?: string | null;
}

/** Fjerner HTML-tags og normaliserer whitespace for sammenligning */
const sanitizeForComparison = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export function useKiAnalyse<FormValues extends Record<string, any>>(
  params: UseKiAnalyseParams<FormValues>,
) {
  const {
    feltType,
    fieldName,
    watchedValue,
    triggerRHF,
    getValues,
    setValue,
    setKiFeilFieldName,
    saveCallback,
    setKiLagret,
    requireHasCheckedToShow,
    setKiSjekketFieldName,
    savedValue,
  } = params;

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

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

  useEffect(() => {
    setHasChecked(false);
    setForceSave(false);
    setLoggId(null);
    resetAnalyse();
    if (setKiSjekketFieldName) {
      setValue(setKiSjekketFieldName as any, false as any, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });
    }
  }, [watchedValue, resetAnalyse, setKiSjekketFieldName, setValue]);

  const kiErrorBorder =
    !!analyse &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !forceSave;

  useEffect(() => {
    const feil =
      !!analyse &&
      !analyseError &&
      !!(analyse as any)?.bryterRetningslinjer &&
      !forceSave;
    setValue(setKiFeilFieldName as any, feil as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }, [analyse, analyseError, forceSave, setKiFeilFieldName, setValue]);

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

    if (savedValue !== undefined) {
      const normalisertLagretVerdi = sanitizeForComparison(savedValue);
      const innholdErUendret = normalisertTekst === normalisertLagretVerdi;
      if (innholdErUendret) {
        return;
      }
    }

    try {
      const kiResultat = await validateKI({
        feltType,
        tekst: tekstVerdi,
      });

      setHasChecked(true);
      if (setKiSjekketFieldName) {
        setValue(setKiSjekketFieldName as any, true as any, {
          shouldDirty: false,
          shouldValidate: false,
          shouldTouch: false,
        });
      }

      const loggId =
        (kiResultat as any)?.loggId ?? (analyse as any)?.loggId ?? null;
      setLoggId(loggId);

      const bryterRetningslinjer =
        (kiResultat as any)?.bryterRetningslinjer ??
        (analyse as any)?.bryterRetningslinjer;

      const kanLagres = !bryterRetningslinjer || forceSave;

      // Lagre hvis godkjent (ikke i publisert redigeringsmodus)
      if (kanLagres && !erRedigeringAvPublisertTreff) {
        await saveCallback(false);

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
      if (setKiSjekketFieldName) {
        setValue(setKiSjekketFieldName as any, true as any, {
          shouldDirty: false,
          shouldValidate: false,
          shouldTouch: false,
        });
      }
    }
  }, [
    triggerRHF,
    fieldName,
    getValues,
    validateKI,
    rekrutteringstreffId,
    feltType,
    forceSave,
    erRedigeringAvPublisertTreff,
    saveCallback,
    setKiLagret,
    analyse,
    setKiSjekketFieldName,
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
    await saveCallback(true);

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
  }, [erRedigeringAvPublisertTreff, saveCallback, loggId, setKiLagret]);

  const showAnalysis = requireHasCheckedToShow ? hasChecked : true;

  return {
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
    runValidationAndMaybeSave,
    onForceSave,
  };
}
