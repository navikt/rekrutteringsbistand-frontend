export type Notatpart = 'ARBEIDSGIVER' | 'JOBBSØKER';

interface Notat {
  verdi: string;
  part: Notatpart;
  tekst: string;
}

export const VURDERINGSNOTATER: Notat[] = [
  {
    verdi: 'AG_GODT_INNTRYKK',
    part: 'ARBEIDSGIVER',
    tekst: 'Godt inntrykk',
  },
  {
    verdi: 'AG_VIL_MØTE_FLERE',
    part: 'ARBEIDSGIVER',
    tekst: 'Vil møte flere før de bestemmer seg',
  },
  {
    verdi: 'AG_IKKE_BEHOV_NÅ',
    part: 'ARBEIDSGIVER',
    tekst: 'Ikke behov akkurat nå',
  },
  {
    verdi: 'AG_AVVENTER_STILLING',
    part: 'ARBEIDSGIVER',
    tekst: 'Avventer avklaring om stillingen',
  },
  {
    verdi: 'AG_ØNSKER_PRAKSIS',
    part: 'ARBEIDSGIVER',
    tekst: 'Ønsker praksis eller hospitering først',
  },
  {
    verdi: 'AG_MANGLER_KOMPETANSE',
    part: 'ARBEIDSGIVER',
    tekst: 'Savner kompetanse eller erfaring',
  },
  {
    verdi: 'AG_MANGLER_SPRÅK',
    part: 'ARBEIDSGIVER',
    tekst: 'Savner språknivå',
  },
  {
    verdi: 'AG_MANGLER_FORMELLE_KRAV',
    part: 'ARBEIDSGIVER',
    tekst: 'Savner førerkort, sertifikat eller lignende',
  },
  {
    verdi: 'AG_ANDRE_PASSET_BEDRE',
    part: 'ARBEIDSGIVER',
    tekst: 'Andre kandidater passet bedre',
  },
  {
    verdi: 'JS_POSITIV',
    part: 'JOBBSØKER',
    tekst: 'Positiv til stillingen',
  },
  {
    verdi: 'JS_VIL_TENKE',
    part: 'JOBBSØKER',
    tekst: 'Vil tenke seg om',
  },
  {
    verdi: 'JS_ØNSKER_MER_INFO',
    part: 'JOBBSØKER',
    tekst: 'Ønsker mer informasjon',
  },
  {
    verdi: 'JS_VURDERER_ANDRE',
    part: 'JOBBSØKER',
    tekst: 'Vurderer andre muligheter',
  },
  {
    verdi: 'JS_IKKE_INTERESSERT',
    part: 'JOBBSØKER',
    tekst: 'Ikke interessert i stillingen',
  },
  {
    verdi: 'JS_ARBEIDSTID',
    part: 'JOBBSØKER',
    tekst: 'Arbeidstid eller turnus passer ikke',
  },
  {
    verdi: 'JS_REISEVEI',
    part: 'JOBBSØKER',
    tekst: 'Reisevei',
  },
  {
    verdi: 'JS_HELSE_KAPASITET',
    part: 'JOBBSØKER',
    tekst: 'Helse eller kapasitet',
  },
];

export const NOTATVERDIER = VURDERINGSNOTATER.map(({ verdi }) => verdi);

/** Kort form, til bruk foran en liste med notater. */
export const PARTSETIKETT: Record<Notatpart, string> = {
  ARBEIDSGIVER: 'Arbeidsgiveren',
  JOBBSØKER: 'Jobbsøkeren',
};

/** Lang form, til gruppeoverskrifter der etiketten står alene. */
export const PARTSOVERSKRIFT: Record<Notatpart, string> = {
  ARBEIDSGIVER: 'Arbeidsgiveren sier',
  JOBBSØKER: 'Jobbsøkeren sier',
};

/** Rekkefølgen styrer både gruppene i velgeren og visningen av valgte notater. */
export const PARTSREKKEFØLGE: Notatpart[] = ['ARBEIDSGIVER', 'JOBBSØKER'];

export const notaterForPart = (part: Notatpart): Notat[] =>
  VURDERINGSNOTATER.filter((notat) => notat.part === part);

export const finnNotat = (verdi: string): Notat | undefined =>
  VURDERINGSNOTATER.find((notat) => notat.verdi === verdi);

export const notattekst = (verdi: string): string =>
  finnNotat(verdi)?.tekst ?? verdi;

export const sorterNotater = (notater: string[]): string[] =>
  [...notater].sort((a, b) => {
    const iA = NOTATVERDIER.indexOf(a);
    const iB = NOTATVERDIER.indexOf(b);
    if (iA === -1 && iB === -1) return a.localeCompare(b, 'nb');
    if (iA === -1) return 1;
    if (iB === -1) return -1;
    return iA - iB;
  });

export const notaterForRad = (notater: string[], part: Notatpart): string[] =>
  sorterNotater(notater).filter((verdi) => finnNotat(verdi)?.part === part);

export const ukjenteNotater = (notater: string[]): string[] =>
  sorterNotater(notater).filter((verdi) => finnNotat(verdi) === undefined);
