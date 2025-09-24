'use client';

import { erEditMode, erPublisert } from './useAutosave';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
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
  isSubmitting: boolean;
  setKiFeilFieldName: keyof FormValues & string;
  saveCallback: (force?: boolean) => Promise<void>;
  setKiLagret?: (args: { id: string; lagret: boolean }) => Promise<void>;
  requireHasCheckedToShow?: boolean;
  setKiSjekketFieldName?: keyof FormValues & string;
  savedValue?: string | null;
}

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
    isSubmitting,
    setKiFeilFieldName,
    saveCallback,
    setKiLagret,
    requireHasCheckedToShow,
    setKiSjekketFieldName,
    savedValue,
  } = params;

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const publisertRedigeringsmodus = erPublisert(treff as any) && erEditMode();

  const {
    trigger: validateKI,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff();

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

  const runValidationAndMaybeSave = useCallback(async () => {
    const ok = await triggerRHF(fieldName as any);
    if (!ok) return;

    const value = getValues(fieldName as any);
    const tekst = (
      typeof value === 'string' ? value : String(value ?? '')
    ).trim();
    const sanitizedTekst = sanitizeForComparison(tekst);
    if (!sanitizedTekst) return;

    if (savedValue !== undefined) {
      const sanitizedSaved = sanitizeForComparison(savedValue);
      if (sanitizedTekst === sanitizedSaved) {
        return;
      }
    }

    try {
      const res = await validateKI({
        treffId: rekrutteringstreffId,
        feltType,
        tekst,
      });

      setHasChecked(true);
      if (setKiSjekketFieldName) {
        setValue(setKiSjekketFieldName as any, true as any, {
          shouldDirty: false,
          shouldValidate: false,
          shouldTouch: false,
        });
      }

      const currentLoggId =
        (res as any)?.loggId ?? (analyse as any)?.loggId ?? null;
      setLoggId(currentLoggId);

      const bryter =
        (res as any)?.bryterRetningslinjer ??
        (analyse as any)?.bryterRetningslinjer;

      const baseOk = !bryter || forceSave;

      const extraGate =
        feltType === 'tittel'
          ? !validating && !isSubmitting && !publisertRedigeringsmodus
          : !publisertRedigeringsmodus;

      if (baseOk && extraGate) {
        await saveCallback(false);
        if (currentLoggId && setKiLagret) {
          try {
            await setKiLagret({ id: currentLoggId, lagret: true });
          } catch (error) {
            new RekbisError({
              message: `Feil ved oppdatering av /lagret for logg ${currentLoggId}.`,
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
    validating,
    isSubmitting,
    publisertRedigeringsmodus,
    saveCallback,
    setKiLagret,
    analyse,
    setKiSjekketFieldName,
    setValue,
    savedValue,
  ]);

  const onForceSave = useCallback(async () => {
    if (publisertRedigeringsmodus) {
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
  }, [publisertRedigeringsmodus, saveCallback, loggId, setKiLagret]);

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
    publisertRedigeringsmodus,
    runValidationAndMaybeSave,
    onForceSave,
  };
}
