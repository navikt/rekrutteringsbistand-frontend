'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import { skalHindreAutosave } from './autosaveUtils';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import {
  oppdaterEttInnlegg,
  opprettInnleggForTreff,
  OpprettEllerOppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import { formatInTimeZone } from 'date-fns-tz';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export function useInnleggAutosave() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { data: innleggListe, mutate } = useInnlegg(rekrutteringstreffId);
  const innlegg = innleggListe?.[0];
  const { getValues, trigger, setValue } = useFormContext<{
    htmlContent?: string;
  }>();

  const save = useCallback(
    async (fieldsToValidate?: string[], force?: boolean) => {
      if (!rekrutteringstreffId) return;

      // Ikke autosave hvis publisert og i redigering, med mindre vi eksplisitt tvinger lagring (Publiser på nytt)
      if (skalHindreAutosave(treff as any, force)) {
        return;
      }

      if (fieldsToValidate && fieldsToValidate.length) {
        const ok = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!ok) return;
      }

      const contentToSave = (getValues('htmlContent') ?? '').toString();
      if (!contentToSave.trim()) return;

      try {
        const navnForPayload =
          innlegg?.opprettetAvPersonNavn ||
          (innlegg as any)?.opprettetAvPersonNavident ||
          'Markedskontakt';

        const payload: OpprettEllerOppdaterInnleggDto = {
          htmlContent: contentToSave,
          tittel: 'Om treffet',
          opprettetAvPersonNavn: navnForPayload,
          opprettetAvPersonBeskrivelse: 'Markedskontakt',
          sendesTilJobbsokerTidspunkt: formatInTimeZone(
            new Date(),
            'Europe/Oslo',
            "yyyy-MM-dd'T'HH:mm:ssXXX",
          ),
        };

        if (innlegg?.id) {
          await oppdaterEttInnlegg(rekrutteringstreffId, innlegg.id, payload);
        } else {
          await opprettInnleggForTreff(rekrutteringstreffId, payload);
        }

        await mutate();
        setValue('htmlContent', contentToSave, { shouldDirty: false });
      } catch (error) {
        new RekbisError({ message: 'Lagring av innlegg feilet.', error });
      }
    },
    [
      getValues,
      innlegg?.id,
      innlegg?.opprettetAvPersonNavn,
      mutate,
      rekrutteringstreffId,
      setValue,
      treff,
      trigger,
    ],
  );

  return { save };
}
