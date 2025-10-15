'use client';

import { useLagreRekrutteringstreff } from '../lagring/useLagreRekrutteringstreff';
import { erPublisert, skalHindreAutosave } from '../utils';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

/**
 * Hook for autosave av rekrutteringstreff.
 *
 * Lagrer automatisk mens brukeren skriver.
 * Respekterer validering (både skjema og KI).
 */
export function useAutosaveRekrutteringstreff() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger, formState } = useFormContext<AnyValues>();
  const { lagre, buildDto } = useLagreRekrutteringstreff();

  const { tittelKiFeil, tittelKiSjekket } = useRekrutteringstreffValidering();

  const autosave = useCallback(
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!rekrutteringstreffId) return;
      if (skalHindreAutosave(treff)) return;

      const valideringOk = await trigger(
        fieldsToValidate && fieldsToValidate.length > 0
          ? (fieldsToValidate as any)
          : undefined,
        { shouldFocus: false },
      );

      if (!valideringOk) {
        return;
      }

      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        const dto = buildDto();
        const endrerPeriode =
          (dto?.fraTid ?? null) !== (treff?.fraTid ?? null) ||
          (dto?.tilTid ?? null) !== (treff?.tilTid ?? null);
        if (endrerPeriode) return;
      }

      // Sjekk KI-feil for tittel
      // VIKTIG: Tittel er alltid med i DTO (buildDto() fallback: treff?.tittel ?? 'Treff uten navn')
      // Dette betyr:
      // - Hvis tittel er tom → lagrer med eksisterende tittel eller default
      // - Hvis tittel er endret → blokkerer lagring ved KI-feil
      // Resultat: Andre felt (tidspunkt, sted, etc.) kan lagres selv om tittel mangler!
      //
      // overstyrKiFeil=true: Hopp over KI-sjekk (brukes når KI allerede er validert av kallende kode)
      if (!overstyrKiFeil) {
        const formVerdier = getValues();
        const trimmedTitle =
          typeof formVerdier.tittel === 'string'
            ? formVerdier.tittel.trim()
            : '';
        const endrerTittel = Boolean(
          trimmedTitle.length > 0 && trimmedTitle !== (treff?.tittel ?? ''),
        );

        // Bare blokkér lagring hvis brukeren aktivt endrer tittel OG den har KI-feil
        if (!erPublisert(treff) && endrerTittel) {
          if (!tittelKiSjekket || tittelKiFeil) {
            return;
          }
        }
      }

      await lagre();
    },
    [
      rekrutteringstreffId,
      treff,
      buildDto,
      trigger,
      formState,
      getValues,
      lagre,
      tittelKiSjekket,
      tittelKiFeil,
    ],
  );

  return { autosave };
}
