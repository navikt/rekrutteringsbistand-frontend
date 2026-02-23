'use client';

import {
  oppdaterInnlegg,
  opprettInnlegg,
  type OppdaterInnleggDto,
  type OpprettInnleggDto,
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
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, mutate } = useInnlegg(rekrutteringstreffId);
  const innlegg = innleggListe?.[0];
  console.log('innleggListe', innleggListe);
  const { getValues, setValue } = useFormContext<{
    htmlContent?: string;
    htmlContentKiLoggId?: string;
    htmlContentKiFeil?: boolean;
    htmlContentGodkjent?: boolean;
  }>();

  const lagre = useCallback(async () => {
    if (!rekrutteringstreffId) return;

    const formVerdier = getValues();
    const innholdSomSkalLagres = (formVerdier.htmlContent ?? '').toString();

    if (innholdSomSkalLagres.trim().length === 0) return;

    const backendHtml = innlegg?.htmlContent ?? '';
    if (innholdSomSkalLagres.trim() === backendHtml.trim()) {
      return;
    }

    try {
      const forfatterNavn =
        innlegg?.opprettetAvPersonNavn ||
        (innlegg as any)?.opprettetAvPersonNavident ||
        'Markedskontakt';

      const basePayload = {
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

      console.log('innlegg.id', innlegg?.id);
      if (innlegg?.id) {
        const oppdaterPayload: OppdaterInnleggDto = {
          ...basePayload,
          innleggKiLoggId: formVerdier.htmlContentKiLoggId ?? null,
          lagreLikevel:
            formVerdier.htmlContentKiFeil === false ||
            formVerdier.htmlContentGodkjent === true,
        };
        await oppdaterInnlegg(
          rekrutteringstreffId,
          innlegg.id,
          oppdaterPayload,
        );
      } else {
        console.log('Oppretter innlegg');
        const opprettPayload: OpprettInnleggDto = {
          ...basePayload,
          innleggKiLoggId: formVerdier.htmlContentKiLoggId ?? null,
          lagreLikevel:
            formVerdier.htmlContentKiFeil === false ||
            formVerdier.htmlContentGodkjent === true,
        };
        await opprettInnlegg(rekrutteringstreffId, opprettPayload);
      }

      mutate();
      setValue('htmlContent', innholdSomSkalLagres, { shouldDirty: false });
    } catch (error) {
      throw new RekbisError({ message: 'Lagring av innlegg feilet.', error });
    }
  }, [getValues, innlegg, mutate, rekrutteringstreffId, setValue]);

  return { lagre, innlegg };
}
