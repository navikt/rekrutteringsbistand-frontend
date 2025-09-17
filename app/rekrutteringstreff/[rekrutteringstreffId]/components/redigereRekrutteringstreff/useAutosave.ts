'use client';

import { toIso as toIsoUtil } from './tidspunkt/utils';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import {
  oppdaterEttInnlegg,
  opprettInnleggForTreff,
  OpprettEllerOppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
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
  try {
    const hendelser = Array.isArray(treff?.hendelser) ? treff.hendelser : [];
    return hendelser.some((h: any) => h?.hendelsestype === 'PUBLISER');
  } catch {
    return false;
  }
};

export const skalHindreAutosave = (treff: any, force?: boolean): boolean => {
  if (force) return false;
  return erPublisert(treff) && erEditMode();
};

export function useAutosave() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger } = useFormContext<AnyValues>();

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

    const safeTitle =
      typeof v.tittel === 'string' && v.tittel.trim().length > 0
        ? v.tittel
        : (treff?.tittel ?? '');

    return {
      tittel: safeTitle,
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

      if (fieldsToValidate && fieldsToValidate.length) {
        const ok = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!ok) return;
      }

      const dto = buildFullDto();
      await oppdaterRekrutteringstreff(rekrutteringstreffId, dto);
      await mutate();
    },
    [buildFullDto, rekrutteringstreffId, trigger, treff, mutate],
  );

  return { save };
}

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
      innlegg,
      mutate,
      rekrutteringstreffId,
      setValue,
      treff,
      trigger,
    ],
  );

  return { save };
}
