import type {
  MøtedagDTO,
  MøtedagFase,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { parseAsInteger } from 'nuqs';

export const MØTEDAG_STEG_QUERY_PARAM = 'visSteg';

export const FØRSTE_STEG = 1;

/**
 * Alle treff har en møtedag. WorkOp er ikke en egen gjennomføring, men den
 * samme møtedagen med to steg til: rom og rotasjon, og intervjufordeling.
 *
 * Stegnumrene er stabile identiteter, ikke posisjoner. Et vanlig treff viser
 * steg 1, 3, 5 og 6, og da står det fortsatt `visSteg=3` i URL-en selv om
 * Stepper tegner Interesse som nummer to. Det gjør at en lenke betyr det samme
 * uansett hvilken variant mottakeren åpner, og at et nytt WorkOp-steg senere
 * ikke forskyver adressene til de generelle stegene.
 */
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

/**
 * Et steg er tilgjengelig når det finnes noe å gjøre der. Rekkefølgen er ikke
 * bare pedagogisk: uten rom er det ingenting å fordele på, og uten noen som er
 * møtt er det ingen å registrere interesse for.
 *
 * Uten WorkOp finnes hverken rom eller intervjufordeling, så stegene som
 * bygger på dem må ha en egen inngang. Da er det oppmøtet og interessene som
 * åpner de neste stegene.
 */
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
    // Steget åpner med møteoppsettet, så det holder at noen er møtt. Rommene
    // blir til der, de er ikke en forutsetning for å komme inn.
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

/**
 * Steget står i URL-en, så det kan komme fra en delt lenke, et bokmerke eller
 * en håndredigert adresse. Da kan det peke på et steg treffet ikke har kommet
 * til ennå – eller på et WorkOp-steg i et vanlig treff. Vi lander på det
 * nærmeste steget bakover som faktisk er tilgjengelig, framfor å vise en tom
 * side eller kaste brukeren helt til start.
 */
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
