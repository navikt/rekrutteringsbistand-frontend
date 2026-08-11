'use client';

import {
  useTreffgjennomforing,
  type TreffgjennomforingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';

interface TreffgjennomforingFane {
  visTreffgjennomforing: boolean;
  erWorkOp: boolean;
  treffgjennomforing: TreffgjennomforingDTO | undefined;
  mutate: ReturnType<typeof useTreffgjennomforing>['mutate'];
}

export type TreffgjennomforingOppdatering = (
  treffgjennomforing?: TreffgjennomforingDTO,
) => void | Promise<unknown>;

export const useTreffgjennomforingFane = (): TreffgjennomforingFane => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;
  const erAktuelt = !erProd && treff !== undefined;

  const { data, error, mutate } = useTreffgjennomforing(
    erAktuelt ? rekrutteringstreffId : undefined,
  );
  const manglerTilgang =
    error instanceof RekbisError && error.statuskode === 403;
  const visTreffgjennomforing = erAktuelt && !manglerTilgang;

  return {
    visTreffgjennomforing,
    erWorkOp,
    treffgjennomforing: visTreffgjennomforing ? data : undefined,
    mutate,
  };
};
