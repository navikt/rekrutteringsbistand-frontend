import type {
  TreffgjennomføringDTO,
  GjeldendeSteg,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { parseAsInteger } from 'nuqs';

export const TREFFGJENNOMFØRING_STEG_QUERY_PARAM = 'visSteg';

export const FØRSTE_STEG = 1;
export interface TreffgjennomføringSteg {
  id: number;
  tittel: string;
  kunWorkOp: boolean;
}

export const TREFFGJENNOMFØRING_STEG: readonly TreffgjennomføringSteg[] = [
  { id: 1, tittel: 'Oppmøte', kunWorkOp: false },
  { id: 2, tittel: 'Rom og rotasjon', kunWorkOp: true },
  { id: 3, tittel: 'Interesse', kunWorkOp: false },
  { id: 4, tittel: 'Intervjufordeling', kunWorkOp: true },
  { id: 5, tittel: 'Registrering av status', kunWorkOp: false },
  { id: 6, tittel: 'Oppsummering', kunWorkOp: false },
] as const;

export const stegFor = (erWorkOp: boolean): TreffgjennomføringSteg[] =>
  TREFFGJENNOMFØRING_STEG.filter((steg) => erWorkOp || !steg.kunWorkOp);

export const GJELDENDE_STEG_TIL_STEGNUMMER: Record<GjeldendeSteg, number> = {
  OPPMØTE: 1,
  ROM: 2,
  INTERESSE: 3,
  FORDELING: 4,
  VURDERING: 5,
  OPPSUMMERING: 6,
};

export const treffgjennomføringStegParser =
  parseAsInteger.withDefault(FØRSTE_STEG);

export const erStegTilgjengelig = (
  steg: number,
  treffgjennomføring: TreffgjennomføringDTO,
  erWorkOp: boolean,
) => {
  if (
    !erWorkOp &&
    TREFFGJENNOMFØRING_STEG.find((s) => s.id === steg)?.kunWorkOp
  )
    return false;

  const nåddSteg =
    GJELDENDE_STEG_TIL_STEGNUMMER[treffgjennomføring.gjeldendeSteg];
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
    default:
      return false;
  }
};

export const nærmesteTilgjengeligeSteg = (
  ønsketSteg: number,
  treffgjennomføring: TreffgjennomføringDTO,
  erWorkOp: boolean,
) => {
  const tilgjengelige = stegFor(erWorkOp).map((steg) => steg.id);
  const høyeste = tilgjengelige[tilgjengelige.length - 1];
  const start = Math.min(Math.max(ønsketSteg, FØRSTE_STEG), høyeste);

  for (let steg = start; steg > FØRSTE_STEG; steg -= 1) {
    if (erStegTilgjengelig(steg, treffgjennomføring, erWorkOp)) return steg;
  }
  return FØRSTE_STEG;
};
