import type {
  TreffgjennomføringDTO,
  GjeldendeSteg,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { parseAsInteger } from 'nuqs';

export const TREFFGJENNOMFØRING_STEG_QUERY_PARAM = 'visSteg';

export const FØRSTE_STEG = 1;
export interface TreffgjennomføringSteg {
  id: number;
  gjeldendeSteg: GjeldendeSteg;
  tittel: string;
  kunWorkOp: boolean;
}

export const TREFFGJENNOMFØRING_STEG: readonly TreffgjennomføringSteg[] = [
  { id: 1, gjeldendeSteg: 'OPPMØTE', tittel: 'Oppmøte', kunWorkOp: false },
  { id: 2, gjeldendeSteg: 'ROM', tittel: 'Rom og rotasjon', kunWorkOp: true },
  { id: 3, gjeldendeSteg: 'INTERESSE', tittel: 'Interesse', kunWorkOp: false },
  {
    id: 4,
    gjeldendeSteg: 'FORDELING',
    tittel: 'Intervjufordeling',
    kunWorkOp: true,
  },
  {
    id: 5,
    gjeldendeSteg: 'VURDERING',
    tittel: 'Vurdering og oppfølging',
    kunWorkOp: false,
  },
  {
    id: 6,
    gjeldendeSteg: 'OPPSUMMERING',
    tittel: 'Oppsummering',
    kunWorkOp: false,
  },
] as const;

export const hentSynligeSteg = (erWorkOp: boolean): TreffgjennomføringSteg[] =>
  TREFFGJENNOMFØRING_STEG.filter((steg) => erWorkOp || !steg.kunWorkOp);

export const hentNåddSteg = (gjeldendeSteg: GjeldendeSteg): number => {
  const steg = TREFFGJENNOMFØRING_STEG.find(
    (steg) => steg.gjeldendeSteg === gjeldendeSteg,
  );
  if (!steg) throw new Error('Ukjent gjennomføringssteg');
  return steg.id;
};

export const treffgjennomføringStegParser =
  parseAsInteger.withDefault(FØRSTE_STEG);

export const erStegTilgjengelig = (
  steg: number,
  treffgjennomføring: TreffgjennomføringDTO,
  erWorkOp: boolean,
) => {
  if (!hentSynligeSteg(erWorkOp).some((synlig) => synlig.id === steg))
    return false;

  const nåddSteg = hentNåddSteg(treffgjennomføring.gjeldendeSteg);
  if (steg === FØRSTE_STEG || steg <= nåddSteg) return true;

  const harMøtt = treffgjennomføring.oppmøte.length > 0;
  const harRom = treffgjennomføring.rom.length > 0;
  const harInteresse = treffgjennomføring.interesser.length > 0;

  switch (steg) {
    case 2:
      return harMøtt;
    case 3:
      return erWorkOp ? harRom : harMøtt;
    case 4:
    case 5:
      return harInteresse;
    case 6:
      return nåddSteg >= 5;
    default:
      return false;
  }
};

export const finnNærmesteTilgjengeligeSteg = (
  ønsketSteg: number,
  treffgjennomføring: TreffgjennomføringDTO,
  erWorkOp: boolean,
) => {
  const tilgjengelige = hentSynligeSteg(erWorkOp).map((steg) => steg.id);
  const høyeste = tilgjengelige[tilgjengelige.length - 1];
  const start = Math.min(Math.max(ønsketSteg, FØRSTE_STEG), høyeste);

  for (let steg = start; steg > FØRSTE_STEG; steg -= 1) {
    if (erStegTilgjengelig(steg, treffgjennomføring, erWorkOp)) return steg;
  }
  return FØRSTE_STEG;
};
