import type {
  MøtedagDTO,
  MøtedagFase,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { parseAsInteger } from 'nuqs';

export const MØTEDAG_STEG_QUERY_PARAM = 'visSteg';

export const FØRSTE_STEG = 1;
export interface MøtedagSteg {
  id: number;
  tittel: string;
  kunWorkOp: boolean;
}

export const MØTEDAG_STEG: readonly MøtedagSteg[] = [
  { id: 1, tittel: 'Oppmøte', kunWorkOp: false },
  { id: 2, tittel: 'Rom og rotasjon', kunWorkOp: true },
  { id: 3, tittel: 'Interesse', kunWorkOp: false },
  { id: 4, tittel: 'Intervjufordeling', kunWorkOp: true },
  { id: 5, tittel: 'Registrering av status', kunWorkOp: false },
  { id: 6, tittel: 'Oppsummering', kunWorkOp: false },
] as const;

export const stegFor = (erWorkOp: boolean): MøtedagSteg[] =>
  MØTEDAG_STEG.filter((steg) => erWorkOp || !steg.kunWorkOp);

export const FASE_TIL_STEG: Record<MøtedagFase, number> = {
  OPPMØTE: 1,
  ROM: 2,
  INTERESSE: 3,
  FORDELING: 4,
  VURDERING: 5,
};

export const møtedagStegParser = parseAsInteger.withDefault(FØRSTE_STEG);

const harIntervjufordeling = (møtedag: MøtedagDTO) =>
  møtedag.intervjufordelinger.some(
    (fordeling) => fordeling.inkludertePersonTreffIder.length > 0,
  );

export const erStegTilgjengelig = (
  steg: number,
  møtedag: MøtedagDTO,
  erWorkOp: boolean,
) => {
  if (!erWorkOp && MØTEDAG_STEG.find((s) => s.id === steg)?.kunWorkOp)
    return false;

  const nåddSteg = FASE_TIL_STEG[møtedag.fase];
  if (steg === FØRSTE_STEG || steg <= nåddSteg) return true;

  const harMøtt = møtedag.oppmøte.length > 0;
  const harRom = møtedag.rom.length > 0;
  const harInteresse = møtedag.interesser.length > 0;

  switch (steg) {
    case 2:
      return harMøtt;
    case 3:
      return erWorkOp ? harRom : harMøtt;
    case 4:
      return harInteresse;
    case 5:
    case 6:
      return erWorkOp ? harIntervjufordeling(møtedag) : harInteresse;
    default:
      return false;
  }
};

export const nærmesteTilgjengeligeSteg = (
  ønsketSteg: number,
  møtedag: MøtedagDTO,
  erWorkOp: boolean,
) => {
  const tilgjengelige = stegFor(erWorkOp).map((steg) => steg.id);
  const høyeste = tilgjengelige[tilgjengelige.length - 1];
  const start = Math.min(Math.max(ønsketSteg, FØRSTE_STEG), høyeste);

  for (let steg = start; steg > FØRSTE_STEG; steg -= 1) {
    if (erStegTilgjengelig(steg, møtedag, erWorkOp)) return steg;
  }
  return FØRSTE_STEG;
};
