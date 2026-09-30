import { Miljø, getMiljø } from '@/util/miljø';

// TODO: Fjern toggle når vi produksjonssetter
export const treffgjennomføringErAktivert = (): boolean =>
  getMiljø() !== Miljø.ProdGcp;

export const erTreffgjennomføringTilgjengelig = (erWorkOp: boolean): boolean =>
  treffgjennomføringErAktivert() && (erWorkOp || getMiljø() === Miljø.Lokalt);
