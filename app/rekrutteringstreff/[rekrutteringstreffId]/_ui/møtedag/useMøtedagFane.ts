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
  /**
   * Om treffet er en WorkOp. Da er møtedagen utvidet med møteoppsett, rom og
   * intervjufordeling – de tre stegene som forutsetter at deltakerne roterer
   * mellom arbeidsgivere i egne rom.
   */
  erWorkOp: boolean;
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

export const useMøtedagFane = (): MøtedagFane => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  // Alle treff har en møtedag, men den er fortsatt under utvikling og holdes
  // borte fra prod. Vi venter på treffet før vi henter: uten kategorien vet vi
  // ikke hvilke steg møtedagen har, og et kall vi må kaste er verre enn et vi
  // ikke rakk å sende.
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
