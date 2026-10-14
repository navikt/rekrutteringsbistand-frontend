import { Miljø, getMiljø } from '@/util/miljø';

export const erTreffgjennomføringTilgjengelig = (erWorkOp: boolean): boolean =>
  erWorkOp || getMiljø() === Miljø.Lokalt;
