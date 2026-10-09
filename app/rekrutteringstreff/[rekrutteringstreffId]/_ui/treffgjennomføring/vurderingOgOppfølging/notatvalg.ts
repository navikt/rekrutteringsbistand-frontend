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
    verdi: 'AG_AVVENTER_ANNEN_STILLING',
    part: 'ARBEIDSGIVER',
    tekst: 'Avventer avklaring om en annen stilling',
  },
  {
    verdi: 'AG_VIL_INVITERE_TIL_BESØK',
    part: 'ARBEIDSGIVER',
    tekst: 'Vil invitere til besøk',
  },
  {
    verdi: 'AG_MANGLER_KOMPETANSE',
    part: 'ARBEIDSGIVER',
    tekst: 'Ønsker mer kompetanse eller erfaring',
  },
  {
    verdi: 'AG_MANGLER_SPRÅK',
    part: 'ARBEIDSGIVER',
    tekst: 'Ønsker høyere språknivå',
  },
  {
    verdi: 'AG_MANGLER_FORMELLE_KRAV',
    part: 'ARBEIDSGIVER',
    tekst: 'Mangler førerkort, sertifikat eller lignende',
  },
  {
    verdi: 'AG_IKKE_RIKTIG_MATCH',
    part: 'ARBEIDSGIVER',
    tekst: 'Ikke riktig match',
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
    verdi: 'JS_IKKE_RIKTIG_MATCH',
    part: 'JOBBSØKER',
    tekst: 'Ikke riktig match',
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
    verdi: 'JS_INDIVIDUELLE_FORUTSETNINGER',
    part: 'JOBBSØKER',
    tekst: 'Individuelle forutsetninger eller kapasitet',
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

/** Sorterer i visningsrekkefølge og hopper over notater som ikke lenger finnes som valg. */
export const sorterNotater = (notater: string[]): string[] =>
  notater
    .filter((verdi) => NOTATVERDIER.includes(verdi))
    .sort((a, b) => NOTATVERDIER.indexOf(a) - NOTATVERDIER.indexOf(b));

export const notaterForRad = (notater: string[], part: Notatpart): string[] =>
  sorterNotater(notater).filter((verdi) => finnNotat(verdi)?.part === part);
