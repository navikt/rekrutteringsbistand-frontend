'use client';

import {
  useTreffgjennomføring,
  treffgjennomføringErAktivert,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';

interface TreffgjennomføringFane {
  visTreffgjennomføring: boolean;
  erWorkOp: boolean;
  treffgjennomføring: TreffgjennomføringDTO | undefined;
  mutate: ReturnType<typeof useTreffgjennomføring>['mutate'];
}

export type TreffgjennomføringOppdatering = (
  treffgjennomføring?: TreffgjennomføringDTO,
) => void | Promise<unknown>;

export const useTreffgjennomføringFane = (): TreffgjennomføringFane => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;

  // Treffgjennomføring vises bare for workop, men vi viser den også lokalt
  // for ikke workop, det skal foreløpig ikke lanseres når vi ikke har workop, men vi vil vite at det fungerer.
  const erAktuelt =
    treff !== undefined &&
    treffgjennomføringErAktivert() &&
    (getMiljø() !== Miljø.DevGcp || erWorkOp);

  const { data, error, mutate } = useTreffgjennomføring(
    erAktuelt ? rekrutteringstreffId : undefined,
  );
  const manglerTilgang =
    error instanceof RekbisError && error.statuskode === 403;
  const visTreffgjennomføring = erAktuelt && !manglerTilgang;

  return {
    visTreffgjennomføring,
    erWorkOp,
    treffgjennomføring: visTreffgjennomføring ? data : undefined,
    mutate,
  };
};
