'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import { toIso as toIsoUtil } from './tidspunkt/utils';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

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

      // Ikke autosave hvis publisert og i redigering, med mindre vi eksplisitt tvinger lagring (Publiser på nytt)
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
    [buildFullDto, mutate, rekrutteringstreffId, trigger, treff],
  );

  return { save };
}

export type Hendelse = { hendelsestype?: string };
export type TreffLike = { hendelser?: Hendelse[] } | null | undefined;

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

export const erPublisert = (treff: TreffLike): boolean => {
  const hendelser = (treff?.hendelser ?? []) as Hendelse[];
  return hendelser.some((h) => h?.hendelsestype === 'PUBLISER');
};

export const skalHindreAutosave = (
  treff: TreffLike,
  force?: boolean,
): boolean => {
  if (force) return false;
  return erPublisert(treff) && erEditMode();
};
