'use client';

import {
  OppdaterRekrutteringstreffDTO,
  oppdaterRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { toIso as toIsoUtil } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/tidspunkt/utils';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

/**
 * Felleslogikk for å lagre rekrutteringstreff til backend.
 * Brukes av både autosave (kladd) og republisering (submit).
 *
 * Bygger DTO fra form-verdier og lagrer via API.
 * Ingen validering skjer her - det er ansvar for kallende kode.
 */
export function useLagreRekrutteringstreff() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { treff } = useRekrutteringstreffData();
  const { getValues } = useFormContext<AnyValues>();

  const byggRekrutteringstreffDto =
    useCallback((): OppdaterRekrutteringstreffDTO => {
      const formVerdier = getValues();

      const fraTid =
        toIsoUtil(formVerdier.fraDato ?? null, formVerdier.fraTid) ??
        treff?.fraTid ??
        null;

      const tilTid =
        toIsoUtil(
          formVerdier.tilDato ?? formVerdier.fraDato ?? null,
          formVerdier.tilTid,
        ) ??
        treff?.tilTid ??
        null;

      const svarfrist =
        toIsoUtil(
          formVerdier.svarfristDato ?? null,
          formVerdier.svarfristTid,
        ) ??
        treff?.svarfrist ??
        null;

      const trimmedTitle =
        typeof formVerdier.tittel === 'string' ? formVerdier.tittel.trim() : '';

      const tittelVerdi =
        trimmedTitle.length > 0
          ? trimmedTitle
          : (treff?.tittel ?? 'Treff uten navn');

      return {
        tittel: tittelVerdi,
        beskrivelse: formVerdier.beskrivelse ?? treff?.beskrivelse ?? null,
        fraTid,
        tilTid,
        svarfrist,
        gateadresse: formVerdier.gateadresse ?? treff?.gateadresse ?? null,
        postnummer: formVerdier.postnummer ?? treff?.postnummer ?? null,
        poststed: formVerdier.poststed ?? treff?.poststed ?? null,
        kommune: formVerdier.kommune ?? treff?.kommune ?? null,
        kommunenummer:
          formVerdier.kommunenummer ?? treff?.kommunenummer ?? null,
        fylke: formVerdier.fylke ?? treff?.fylke ?? null,
        fylkesnummer: formVerdier.fylkesnummer ?? treff?.fylkesnummer ?? null,
      };
    }, [getValues, treff]);

  const lagre = useCallback(async () => {
    if (!rekrutteringstreffId) return;

    const dto = byggRekrutteringstreffDto();
    await oppdaterRekrutteringstreff(rekrutteringstreffId, dto);
    mutate();
  }, [byggRekrutteringstreffDto, rekrutteringstreffId, mutate]);

  return { lagre, byggRekrutteringstreffDto };
}
