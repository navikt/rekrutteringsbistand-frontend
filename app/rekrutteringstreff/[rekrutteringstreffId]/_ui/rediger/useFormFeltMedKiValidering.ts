'use client';

import { erEditMode, erPublisert } from './hooks/utils';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { useEffect, useState, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type FeltType = 'tittel' | 'innlegg';

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

  const kiErrorBorder =
    !!analyse &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !harGodkjentKiFeil;

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
        new RekbisError({ message: `Lagring av ${feltType} feilet.`, error });
      } finally {
        onUpdated?.();
      }
    },
    [saveCallback, fieldName, feltType, onUpdated],
  );

  const validerMedKiOgLagreVedGodkjenning = useCallback(async () => {
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
      if (normalisertTekst === normalisertLagretVerdi) return;
    }

    try {
      const kiResultat = await validateKI({ feltType, tekst: tekstVerdi });

      setHasChecked(true);
      setValue(`${fieldName}KiSjekket` as any, true as any, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });

      const loggIdNy =
        (kiResultat as any)?.loggId ?? (analyse as any)?.loggId ?? null;
      setLoggId(loggIdNy);

      const bryterRetningslinjer =
        (kiResultat as any)?.bryterRetningslinjer ??
        (analyse as any)?.bryterRetningslinjer;

      if (!bryterRetningslinjer) {
        // KI-validering er OK, lagre med overstyrKiFeil=true
        // (hopper over KI-sjekk i autosave siden vi allerede har validert)
        await wrappedSaveCallback(true);

        if (loggIdNy && setKiLagret) {
          try {
            await setKiLagret({ id: loggIdNy, lagret: true });
          } catch (error) {
            new RekbisError({
              message: `Feil ved oppdatering av /lagret for logg ${loggIdNy}.`,
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
      setHasChecked(true);
      setValue(`${fieldName}KiSjekket` as any, true as any, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });
      setValue(`${fieldName}KiFeil` as any, false as any, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });
      onUpdated?.();
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
  }, [
    erRedigeringAvPublisertTreff,
    wrappedSaveCallback,
    loggId,
    setKiLagret,
    fieldName,
    setValue,
    onUpdated,
  ]);

  const bryterRetningslinjerFlag =
    !!analyse && !analyseError && !!(analyse as any)?.bryterRetningslinjer;

  const showAnalysis = requireHasCheckedToShow
    ? hasChecked && bryterRetningslinjerFlag
    : bryterRetningslinjerFlag;

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
    kiLoggLoading,
  };
}
