'use client';

import { useMøtedag } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';

export const useVisWorkOpGjennomføring = (): boolean => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;
  const erAktuelt = !erProd && erWorkOp;

  const { error } = useMøtedag(erAktuelt ? rekrutteringstreffId : undefined);
  const manglerTilgang =
    error instanceof RekbisError && error.statuskode === 403;

  return erAktuelt && !manglerTilgang;
};
