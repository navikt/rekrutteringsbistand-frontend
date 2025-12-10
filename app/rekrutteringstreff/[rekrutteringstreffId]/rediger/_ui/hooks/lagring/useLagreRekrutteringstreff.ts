'use client';

import {
  OppdaterRekrutteringstreffDTO,
  oppdaterRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import {
  skalHindreAutosave,
  skalStanseAutosavePgaKi,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/utils';
import { useRekrutteringstreffValidering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/validering/useRekrutteringstreffValidering';
import { toIso as toIsoUtil } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/tidspunkt/utils';
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
  const { mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { treff } = useRekrutteringstreffData();
  const { getValues, trigger, formState } = useFormContext<AnyValues>();
  const { tittelKiFeil, tittelKiSjekket } = useRekrutteringstreffValidering();
  const kanAutoLagre = !skalHindreAutosave(treff?.status as any);

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

  const lagreUtenValidering = useCallback(async () => {
    if (!kanAutoLagre) return;
    if (!rekrutteringstreffId) return;

    const dto = byggRekrutteringstreffDto();

    try {
      startLagring('rekrutteringstreff');
      await oppdaterRekrutteringstreff(rekrutteringstreffId, dto);
      mutate();
    } finally {
      stoppLagring('rekrutteringstreff');
    }
  }, [
    byggRekrutteringstreffDto,
    rekrutteringstreffId,
    mutate,
    startLagring,
    stoppLagring,
  ]);

  const lagreMedValidering = useCallback(
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!kanAutoLagre) return;

      const valideringsFelter =
        fieldsToValidate && fieldsToValidate.length > 0
          ? (fieldsToValidate as any)
          : undefined;

      const valideringOk = await trigger(valideringsFelter, {
        shouldFocus: false,
      });
      if (!valideringOk) {
        return;
      }

      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        const dto = byggRekrutteringstreffDto();
        const endrerPeriode =
          (dto?.fraTid ?? null) !== (treff?.fraTid ?? null) ||
          (dto?.tilTid ?? null) !== (treff?.tilTid ?? null);
        if (endrerPeriode) return;
      }

      const formVerdier = getValues();
      const trimmedTitle =
        typeof formVerdier.tittel === 'string' ? formVerdier.tittel.trim() : '';
      const endrerTittel = Boolean(
        trimmedTitle.length > 0 && trimmedTitle !== (treff?.tittel ?? ''),
      );

      if (
        skalStanseAutosavePgaKi(
          overstyrKiFeil ?? false,
          endrerTittel,
          tittelKiFeil,
          tittelKiSjekket,
        )
      ) {
        return;
      }

      await lagreUtenValidering();
    },
    [
      byggRekrutteringstreffDto,
      formState?.errors,
      getValues,
      kanAutoLagre,
      lagreUtenValidering,
      tittelKiFeil,
      tittelKiSjekket,
      treff,
      trigger,
    ],
  );

  return {
    lagre: lagreUtenValidering,
    lagreMedValidering,
    byggRekrutteringstreffDto,
    kanAutoLagre,
    treff,
  };
}
