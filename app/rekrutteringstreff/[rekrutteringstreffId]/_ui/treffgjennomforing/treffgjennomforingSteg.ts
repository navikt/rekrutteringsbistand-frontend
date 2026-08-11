import type {
  TreffgjennomforingDTO,
  TreffgjennomforingFase,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { parseAsInteger } from 'nuqs';

export const TREFFGJENNOMFORING_STEG_QUERY_PARAM = 'visSteg';

export const FØRSTE_STEG = 1;
export interface TreffgjennomforingSteg {
  id: number;
  tittel: string;
  kunWorkOp: boolean;
}

export const TREFFGJENNOMFORING_STEG: readonly TreffgjennomforingSteg[] = [
  { id: 1, tittel: 'Oppmøte', kunWorkOp: false },
  { id: 2, tittel: 'Rom og rotasjon', kunWorkOp: true },
  { id: 3, tittel: 'Interesse', kunWorkOp: false },
  { id: 4, tittel: 'Intervjufordeling', kunWorkOp: true },
  { id: 5, tittel: 'Registrering av status', kunWorkOp: false },
  { id: 6, tittel: 'Oppsummering', kunWorkOp: false },
] as const;

export const stegFor = (erWorkOp: boolean): TreffgjennomforingSteg[] =>
  TREFFGJENNOMFORING_STEG.filter((steg) => erWorkOp || !steg.kunWorkOp);

export const FASE_TIL_STEG: Record<TreffgjennomforingFase, number> = {
  OPPMØTE: 1,
  ROM: 2,
  INTERESSE: 3,
  FORDELING: 4,
  VURDERING: 5,
};

export const treffgjennomforingStegParser =
  parseAsInteger.withDefault(FØRSTE_STEG);

const harIntervjufordeling = (treffgjennomforing: TreffgjennomforingDTO) =>
  treffgjennomforing.intervjufordelinger.some(
    (fordeling) => fordeling.inkludertePersonTreffIder.length > 0,
  );

export const erStegTilgjengelig = (
  steg: number,
  treffgjennomforing: TreffgjennomforingDTO,
  erWorkOp: boolean,
) => {
  if (
    !erWorkOp &&
    TREFFGJENNOMFORING_STEG.find((s) => s.id === steg)?.kunWorkOp
  )
    return false;

  const nåddSteg = FASE_TIL_STEG[treffgjennomforing.fase];
  if (steg === FØRSTE_STEG || steg <= nåddSteg) return true;

  const harMøtt = treffgjennomforing.oppmøte.length > 0;
  const harRom = treffgjennomforing.rom.length > 0;
  const harInteresse = treffgjennomforing.interesser.length > 0;

  switch (steg) {
    case 2:
      return harMøtt;
    case 3:
      return erWorkOp ? harRom : harMøtt;
    case 4:
      return harInteresse;
    case 5:
    case 6:
      return erWorkOp ? harIntervjufordeling(treffgjennomforing) : harInteresse;
    default:
      return false;
  }
};

export const nærmesteTilgjengeligeSteg = (
  ønsketSteg: number,
  treffgjennomforing: TreffgjennomforingDTO,
  erWorkOp: boolean,
) => {
  const tilgjengelige = stegFor(erWorkOp).map((steg) => steg.id);
  const høyeste = tilgjengelige[tilgjengelige.length - 1];
  const start = Math.min(Math.max(ønsketSteg, FØRSTE_STEG), høyeste);

  for (let steg = start; steg > FØRSTE_STEG; steg -= 1) {
    if (erStegTilgjengelig(steg, treffgjennomforing, erWorkOp)) return steg;
  }
  return FØRSTE_STEG;
};
