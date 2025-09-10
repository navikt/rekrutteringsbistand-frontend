'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import { erEditMode, erPublisert } from './useAutosave';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import { useEffect, useMemo, useState, useCallback } from 'react';
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
}

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
  } = params;

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const publisertRedigeringsmodus = useMemo(
    () => erPublisert(treff as any) && erEditMode(),
    [treff],
  );

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
  }, [watchedValue, resetAnalyse]);

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
    if (!tekst) return;

    try {
      const res = await validateKI({
        treffId: rekrutteringstreffId,
        feltType,
        tekst,
      });

      setHasChecked(true);

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
