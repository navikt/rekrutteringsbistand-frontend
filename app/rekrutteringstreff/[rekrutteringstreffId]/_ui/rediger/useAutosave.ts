'use client';

import { toIso as toIsoUtil } from './tidspunkt/utils';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/mutations';
import {
  oppdaterEttInnlegg,
  opprettInnleggForTreff,
  OpprettEllerOppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import { formatInTimeZone } from 'date-fns-tz';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

export const erEditMode = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('mode') === 'edit'
    );
  } catch {
    return false;
  }
};

export const erPublisert = (treff: any): boolean => {
  const step = getActiveStepFromHendelser(treff?.hendelser);
  return step === 'INVITERE' || step === 'FULLFØRE';
};

export const skalHindreAutosave = (treff: any, force?: boolean): boolean => {
  if (force) return false;
  return erPublisert(treff) && erEditMode();
};

export function useAutosave() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger, formState } = useFormContext<AnyValues>();

  const buildFullDto = useCallback(() => {
    const v = getValues();

    const fraTid =
      toIsoUtil(v.fraDato ?? null, v.fraTid) ?? treff?.fraTid ?? null;

    const tilTid =
      toIsoUtil(v.tilDato ?? v.fraDato ?? null, v.tilTid) ??
      treff?.tilTid ??
      null;

    const svarfrist =
      toIsoUtil(v.svarfristDato ?? null, v.svarfristTid) ??
      treff?.svarfrist ??
      null;

    // Bare inkluder tittel dersom den faktisk har innhold (API krever min. 1 tegn når feltet er med)
    const trimmedTitle = typeof v.tittel === 'string' ? v.tittel.trim() : '';
    const includeTitle =
      trimmedTitle.length > 0 ||
      (treff?.tittel && treff.tittel.trim().length > 0);

    return {
      ...(includeTitle && {
        tittel: trimmedTitle.length > 0 ? trimmedTitle : treff?.tittel,
      }),
      beskrivelse: (v.beskrivelse ?? treff?.beskrivelse ?? null) as
        | string
        | null,
      fraTid,
      tilTid,
      svarfrist,
      gateadresse: (v.gateadresse ?? treff?.gateadresse ?? null) as
        | string
        | null,
      postnummer: (v.postnummer ?? treff?.postnummer ?? null) as string | null,
      poststed: (v.poststed ?? treff?.poststed ?? null) as string | null,
    };
  }, [getValues, treff]);

  const save = useCallback(
    async (fieldsToValidate?: string[], force?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff, force)) {
        return;
      }

      // Kjør validering for spesifikke felter, eller hele skjemaet hvis ingen er spesifisert
      const shouldValidateAll =
        !fieldsToValidate || fieldsToValidate.length === 0;
      const ok = await trigger(
        shouldValidateAll ? undefined : (fieldsToValidate as any),
        {
          shouldFocus: false,
        },
      );
      if (!ok) return;

      // Ikke lagre dersom vi har en manuell periodefeil (lik eller negativ tid)
      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        return;
      }

      const dto = buildFullDto();
      try {
        startLagring('rekrutteringstreff');
        await oppdaterRekrutteringstreff(rekrutteringstreffId, dto);
        mutate();
      } finally {
        stoppLagring('rekrutteringstreff');
      }
    },
    [
      buildFullDto,
      rekrutteringstreffId,
      trigger,
      treff,
      mutate,
      formState?.errors,
      startLagring,
      stoppLagring,
    ],
  );

  return { save };
}

export function useInnleggAutosave() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
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

        startLagring('innlegg');
        if (innlegg?.id) {
          await oppdaterEttInnlegg(rekrutteringstreffId, innlegg.id, payload);
        } else {
          await opprettInnleggForTreff(rekrutteringstreffId, payload);
        }

        mutate();

        setValue('htmlContent', contentToSave, { shouldDirty: false });
      } catch (error) {
        new RekbisError({ message: 'Lagring av innlegg feilet.', error });
      } finally {
        stoppLagring('innlegg');
      }
    },
    [
      getValues,
      innlegg,
      mutate,
      rekrutteringstreffId,
      startLagring,
      stoppLagring,
      setValue,
      treff,
      trigger,
    ],
  );

  return { save };
}
