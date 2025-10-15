'use client';

import { toIso as toIsoUtil } from '../../tidspunkt/utils';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
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
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues } = useFormContext<AnyValues>();

  const buildDto = useCallback(() => {
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
      toIsoUtil(formVerdier.svarfristDato ?? null, formVerdier.svarfristTid) ??
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
      beskrivelse: (formVerdier.beskrivelse ?? treff?.beskrivelse ?? null) as
        | string
        | null,
      fraTid,
      tilTid,
      svarfrist,
      gateadresse: (formVerdier.gateadresse ?? treff?.gateadresse ?? null) as
        | string
        | null,
      postnummer: (formVerdier.postnummer ?? treff?.postnummer ?? null) as
        | string
        | null,
      poststed: (formVerdier.poststed ?? treff?.poststed ?? null) as
        | string
        | null,
    };
  }, [getValues, treff]);

  const lagre = useCallback(async () => {
    if (!rekrutteringstreffId) return;

    const dto = buildDto();

    try {
      startLagring('rekrutteringstreff');
      await oppdaterRekrutteringstreff(rekrutteringstreffId, dto);
      mutate();
    } finally {
      stoppLagring('rekrutteringstreff');
    }
  }, [buildDto, rekrutteringstreffId, mutate, startLagring, stoppLagring]);

  return { lagre, buildDto };
}
