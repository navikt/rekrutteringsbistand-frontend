import type {
  GjeldendeSteg,
  TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { parseAsInteger } from 'nuqs';

export const TREFFGJENNOMFØRING_STEG_QUERY_PARAM = 'visSteg';

/** Stegnummer i URL-en, oppkalt etter `gjeldendeSteg` fra backend. */
export const STEG = {
  OPPMØTE: 1,
  ROM: 2,
  INTERESSE: 3,
  FORDELING: 4,
  VURDERING: 5,
  OPPSUMMERING: 6,
} as const satisfies Record<GjeldendeSteg, number>;

export const FØRSTE_STEG = STEG.OPPMØTE;

export interface TreffgjennomføringSteg {
  id: number;
  tittel: string;
  kunWorkOp: boolean;
}

export const TREFFGJENNOMFØRING_STEG: readonly TreffgjennomføringSteg[] = [
  { id: STEG.OPPMØTE, tittel: 'Oppmøte', kunWorkOp: false },
  { id: STEG.ROM, tittel: 'Rom og rotasjon', kunWorkOp: true },
  { id: STEG.INTERESSE, tittel: 'Interesse', kunWorkOp: false },
  { id: STEG.FORDELING, tittel: 'Intervjufordeling', kunWorkOp: true },
  { id: STEG.VURDERING, tittel: 'Vurdering og oppfølging', kunWorkOp: false },
  { id: STEG.OPPSUMMERING, tittel: 'Oppsummering', kunWorkOp: false },
];

export const hentSynligeSteg = (erWorkOp: boolean): TreffgjennomføringSteg[] =>
  TREFFGJENNOMFØRING_STEG.filter((steg) => erWorkOp || !steg.kunWorkOp);

export const treffgjennomføringStegParser =
  parseAsInteger.withDefault(FØRSTE_STEG);

export const hentNåddSteg = (
  treffgjennomføring: TreffgjennomføringDTO,
): number => STEG[treffgjennomføring.gjeldendeSteg];

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

  if (steg === FØRSTE_STEG || steg <= hentNåddSteg(treffgjennomføring))
    return true;

  const harMøtt = treffgjennomføring.oppmøte.length > 0;
  const harRom = treffgjennomføring.rom.length > 0;
  const harInteresse = treffgjennomføring.interesser.length > 0;

  switch (steg) {
    case STEG.ROM:
      return harMøtt;
    case STEG.INTERESSE:
      return erWorkOp ? harRom : harMøtt;
    case STEG.FORDELING:
    case STEG.VURDERING:
      return harInteresse;
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

/**
 * Hvor brukeren er i stegrekken. Uten data brukes steget fra URL-en direkte,
 * siden tilgjengeligheten ikke kan avgjøres ennå.
 */
export const lagStegposisjon = (
  stegFraUrl: number,
  treffgjennomføring: TreffgjennomføringDTO | undefined,
  erWorkOp: boolean,
) => {
  const synligeSteg = hentSynligeSteg(erWorkOp);
  const aktivtSteg = treffgjennomføring
    ? finnNærmesteTilgjengeligeSteg(stegFraUrl, treffgjennomføring, erWorkOp)
    : stegFraUrl;
  const indeks = synligeSteg.findIndex((steg) => steg.id === aktivtSteg);

  return {
    synligeSteg,
    aktivtSteg,
    forrigeSteg: synligeSteg[indeks - 1] as TreffgjennomføringSteg | undefined,
    nesteSteg: synligeSteg[indeks + 1] as TreffgjennomføringSteg | undefined,
    /** 1-basert plass blant de synlige stegene. */
    posisjonFor: (steg: number) =>
      Math.max(
        synligeSteg.findIndex((synlig) => synlig.id === steg),
        0,
      ) + 1,
  };
};
