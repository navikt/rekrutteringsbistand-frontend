'use client';

import { useLagreInnlegg } from '../lagring/useLagreInnlegg';
import { erPublisert, skalHindreAutosave } from '../utils';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Hook for autosave av innlegg (kladd-modus).
 *
 * Lagrer automatisk mens brukeren skriver.
 * Respekterer validering (både skjema og KI).
 * Hindrer autosave hvis treffet er publisert og i edit-mode.
 *
 * Brukes av: InnleggForm
 */
export function useAutosaveInnlegg() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger, formState } = useFormContext<{
    htmlContent?: string;
  }>();
  const { lagre } = useLagreInnlegg();

  const { harInnleggFeil, innleggKiFeil, innleggKiSjekket } =
    useRekrutteringstreffValidering();

  const autosave = useCallback(
    async (fieldsToValidate?: string[]) => {
      if (!rekrutteringstreffId) return;
      if (skalHindreAutosave(treff as any)) return;

      if (fieldsToValidate && fieldsToValidate.length) {
        const valideringOk = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!valideringOk) return;
      }

      const formVerdier = getValues();
      const innholdSomSkalLagres = (formVerdier.htmlContent ?? '').toString();
      const harInnleggInnhold = Boolean(innholdSomSkalLagres.trim().length > 0);

      if (!harInnleggInnhold) return;

      if (harInnleggFeil) return;
      if (innleggKiFeil) return;

      if (!erPublisert(treff as any)) {
        if (!innleggKiSjekket || innleggKiFeil) return;
      }

      await lagre();
    },
    [
      rekrutteringstreffId,
      treff,
      trigger,
      formState,
      getValues,
      lagre,
      harInnleggFeil,
      innleggKiFeil,
      innleggKiSjekket,
    ],
  );

  return { autosave };
}
