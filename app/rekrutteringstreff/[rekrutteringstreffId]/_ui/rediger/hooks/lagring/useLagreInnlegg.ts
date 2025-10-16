'use client';

import {
  oppdaterInnlegg,
  opprettInnlegg,
  type OpprettInnleggDto,
  type OppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { formatInTimeZone } from 'date-fns-tz';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Felleslogikk for å lagre innlegg til backend.
 * Brukes av både autosave (kladd) og republisering (submit).
 *
 * Ingen validering skjer her - det er ansvar for kallende kode.
 */
export function useLagreInnlegg() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: innleggListe, mutate } = useInnlegg(rekrutteringstreffId);
  const innlegg = innleggListe?.[0];
  const { getValues, setValue } = useFormContext<{ htmlContent?: string }>();

  const lagre = useCallback(async () => {
    if (!rekrutteringstreffId) return;

    const formVerdier = getValues();
    const innholdSomSkalLagres = (formVerdier.htmlContent ?? '').toString();

    if (innholdSomSkalLagres.trim().length === 0) return;

    try {
      const forfatterNavn =
        innlegg?.opprettetAvPersonNavn ||
        (innlegg as any)?.opprettetAvPersonNavident ||
        'Markedskontakt';

      const payloadData = {
        htmlContent: innholdSomSkalLagres,
        tittel: 'Om treffet',
        opprettetAvPersonNavn: forfatterNavn,
        opprettetAvPersonBeskrivelse: 'Markedskontakt',
        sendesTilJobbsokerTidspunkt: formatInTimeZone(
          new Date(),
          'Europe/Oslo',
          "yyyy-MM-dd'T'HH:mm:ssXXX",
        ),
      };

      startLagring('innlegg');

      if (innlegg?.id) {
        await oppdaterInnlegg(
          rekrutteringstreffId,
          innlegg.id,
          payloadData as OppdaterInnleggDto,
        );
      } else {
        await opprettInnlegg(
          rekrutteringstreffId,
          payloadData as OpprettInnleggDto,
        );
      }

      mutate();
      setValue('htmlContent', innholdSomSkalLagres, { shouldDirty: false });
    } catch (error) {
      new RekbisError({ message: 'Lagring av innlegg feilet.', error });
    } finally {
      stoppLagring('innlegg');
    }
  }, [
    getValues,
    innlegg,
    mutate,
    rekrutteringstreffId,
    startLagring,
    stoppLagring,
    setValue,
  ]);

  return { lagre, innlegg };
}
