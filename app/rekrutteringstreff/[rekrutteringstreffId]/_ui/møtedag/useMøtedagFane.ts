'use client';

import {
  useMøtedag,
  type MøtedagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';

interface MøtedagFane {
  visMøtedag: boolean;
  erWorkOp: boolean;
  møtedag: MøtedagDTO | undefined;
  mutate: ReturnType<typeof useMøtedag>['mutate'];
}

export type MøtedagOppdatering = (
  møtedag?: MøtedagDTO,
) => void | Promise<unknown>;

export const useMøtedagFane = (): MøtedagFane => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;
  const erAktuelt = !erProd && treff !== undefined;

  const { data, error, mutate } = useMøtedag(
    erAktuelt ? rekrutteringstreffId : undefined,
  );
  const manglerTilgang =
    error instanceof RekbisError && error.statuskode === 403;
  const visMøtedag = erAktuelt && !manglerTilgang;

  return {
    visMøtedag,
    erWorkOp,
    møtedag: visMøtedag ? data : undefined,
    mutate,
  };
};
