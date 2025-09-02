'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

function toIso(
  date: Date | null | undefined,
  time?: string | null,
): string | null {
  if (!date) return null;

  const [hStr = '0', mStr = '0'] = String(time ?? '00:00').split(':');
  const hh = Number.isFinite(Number(hStr)) ? Number(hStr) : 0;
  const mm = Number.isFinite(Number(mStr)) ? Number(mStr) : 0;

  const d = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hh,
    mm,
    0,
    0,
  );
  if (isNaN(d.getTime())) return null;

  return format(d, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

export function useAutosave() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger } = useFormContext<AnyValues>();

  const buildFullDto = useCallback(() => {
    const v = getValues();

    const fraTid = toIso(v.fraDato ?? null, v.fraTid) ?? treff?.fraTid ?? null;

    const tilTid =
      toIso(v.tilDato ?? v.fraDato ?? null, v.tilTid) ?? treff?.tilTid ?? null;

    const svarfrist =
      toIso(v.svarfristDato ?? null, v.svarfristTid) ??
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
    async (fieldsToValidate?: string[]) => {
      if (!rekrutteringstreffId) return;

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
    [buildFullDto, mutate, rekrutteringstreffId, trigger],
  );

  return { save };
}
