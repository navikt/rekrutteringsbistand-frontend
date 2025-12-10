'use client';

import {
  oppdaterInnlegg,
  opprettInnlegg,
  type OppdaterInnleggDto,
  type OpprettInnleggDto,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  skalHindreAutosave,
  skalStanseAutosavePgaKi,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/utils';
import { useRekrutteringstreffValidering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/validering/useRekrutteringstreffValidering';
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
  const { getValues, setValue, trigger } = useFormContext<{
    htmlContent?: string;
  }>();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { harInnleggFeil, innleggKiFeil, innleggKiSjekket } =
    useRekrutteringstreffValidering();
  const kanAutoLagre = !skalHindreAutosave((treff as any)?.status);

  const lagreUtenValidering = useCallback(async () => {
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

  const lagreMedValidering = useCallback(
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!kanAutoLagre) return;
      if (!rekrutteringstreffId) return;

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

      const eksisterendeInnhold = innlegg?.htmlContent ?? '';
      const endrerInnlegg = Boolean(
        innholdSomSkalLagres.trim().length > 0 &&
          innholdSomSkalLagres !== eksisterendeInnhold,
      );

      if (
        skalStanseAutosavePgaKi(
          overstyrKiFeil ?? false,
          endrerInnlegg,
          innleggKiFeil,
          innleggKiSjekket,
        )
      ) {
        return;
      }

      await lagreUtenValidering();
    },
    [
      getValues,
      harInnleggFeil,
      innlegg?.htmlContent,
      innleggKiFeil,
      innleggKiSjekket,
      kanAutoLagre,
      lagreUtenValidering,
      rekrutteringstreffId,
      trigger,
    ],
  );

  return {
    lagre: lagreUtenValidering,
    lagreMedValidering,
    innlegg,
    kanAutoLagre,
  };
}
