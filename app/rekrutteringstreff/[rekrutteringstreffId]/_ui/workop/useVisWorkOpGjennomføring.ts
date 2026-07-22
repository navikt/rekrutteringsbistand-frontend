'use client';

import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Miljø, getMiljø } from '@/util/miljø';

// Tilgang/gating (sikkerhetsrelevant): WorkOp gjennomføring vises kun for
// WorkOp-treff og utenfor prod, på linje med Formidlinger-fanen. Fanene vises
// dessuten kun for eier (håndteres i Rekrutteringstreff.tsx). Dette er
// frontend-gating for demo – backend (fase E) MÅ håndheve kategori, eier og
// rolle server-side.
export const useVisWorkOpGjennomføring = (): boolean => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const erWorkOp = treff?.kategori === RekrutteringstreffKategori.WORKOP;

  return !erProd && erWorkOp;
};
