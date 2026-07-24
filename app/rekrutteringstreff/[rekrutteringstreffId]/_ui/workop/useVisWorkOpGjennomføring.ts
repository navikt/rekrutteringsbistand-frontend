'use client';

import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Miljø, getMiljø } from '@/util/miljø';

export const useVisWorkOpGjennomføring = (): boolean => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;

  return !erProd && erWorkOp;
};
