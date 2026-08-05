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

interface WorkOpMøtedag {
  visWorkOp: boolean;
  møtedag: MøtedagDTO | undefined;
  mutate: ReturnType<typeof useMøtedag>['mutate'];
}

/**
 * Hvordan stegene oppdaterer møtedagen i SWR-cachen.
 *
 * Speiler SWRs egen `mutate`: kalles den med en møtedag, legges den rett i
 * cachen uten revalidering – skrivekallene returnerer hele aggregatet, så vi
 * kjenner fasit. Kalles den uten argument, henter vi på nytt fra serveren.
 *
 * Det siste trengs når en lagring feiler: en 409 betyr som regel at møtedagen
 * har endret seg under føttene på oss, og da er cachen vår utdatert.
 */
export type MøtedagOppdatering = (
  møtedag?: MøtedagDTO,
) => void | Promise<unknown>;

export const useWorkOpMøtedag = (): WorkOpMøtedag => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;
  const erAktuelt = !erProd && erWorkOp;

  const { data, error, mutate } = useMøtedag(
    erAktuelt ? rekrutteringstreffId : undefined,
  );
  const manglerTilgang =
    error instanceof RekbisError && error.statuskode === 403;
  const visWorkOp = erAktuelt && !manglerTilgang;

  return { visWorkOp, møtedag: visWorkOp ? data : undefined, mutate };
};
