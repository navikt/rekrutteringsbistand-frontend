import type {
  MøtedagDTO,
  MøtedagFase,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { parseAsInteger } from 'nuqs';

export const WORKOP_STEG_QUERY_PARAM = 'visSteg';

export const FØRSTE_STEG = 1;
export const WORKOP_STEG_TITLER = [
  'Oppmøte og oppsett',
  'Rom og rotasjon',
  'Ønsker',
  'Intervjufordeling',
  'Registrering av status',
  'Oppsummering',
] as const;
export const SISTE_STEG = WORKOP_STEG_TITLER.length;

export const workopStegParser = parseAsInteger.withDefault(FØRSTE_STEG);

export const FASE_TIL_STEG: Record<MøtedagFase, number> = {
  OPPMØTE: 1,
  ROM: 2,
  ØNSKER: 3,
  FORDELING: 4,
  VURDERING: 5,
};

/**
 * Et steg er tilgjengelig når det finnes noe å gjøre der. Rekkefølgen er ikke
 * bare pedagogisk: uten rom er det ingenting å fordele på, og uten
 * intervjufordeling er det ingen å registrere status for.
 */
export const erStegTilgjengelig = (steg: number, møtedag: MøtedagDTO) => {
  const nåddSteg = FASE_TIL_STEG[møtedag.fase];
  return (
    steg === 1 ||
    steg <= nåddSteg ||
    (steg === 2 && møtedag.rom.length > 0) ||
    (steg === 3 && møtedag.rom.length > 0) ||
    (steg === 4 && møtedag.ønsker.length > 0) ||
    ((steg === 5 || steg === 6) &&
      møtedag.intervjufordelinger.some(
        (fordeling) => fordeling.inkludertePersonTreffIder.length > 0,
      ))
  );
};

/**
 * Steget står i URL-en, så det kan komme fra en delt lenke, et bokmerke eller
 * en håndredigert adresse. Da kan det peke på et steg treffet ikke har kommet
 * til ennå. Vi lander på det nærmeste steget bakover som faktisk er
 * tilgjengelig, framfor å vise en tom side eller kaste brukeren helt til start.
 */
export const nærmesteTilgjengeligeSteg = (
  ønsketSteg: number,
  møtedag: MøtedagDTO,
) => {
  const start = Math.min(Math.max(ønsketSteg, FØRSTE_STEG), SISTE_STEG);
  for (let steg = start; steg > FØRSTE_STEG; steg -= 1) {
    if (erStegTilgjengelig(steg, møtedag)) return steg;
  }
  return FØRSTE_STEG;
};
