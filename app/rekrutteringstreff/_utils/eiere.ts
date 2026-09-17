import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';

export const erEierAvTreff = (eierOgKontor: EierOgKontor[], navIdent: string) =>
  eierOgKontor.some((eier) => eier.navIdent === navIdent);

export const harKontorPåTreff = (
  eierOgKontor: EierOgKontor[],
  kontorEnhetId: string,
) => eierOgKontor.some((eier) => eier.kontorEnhetId === kontorEnhetId);
