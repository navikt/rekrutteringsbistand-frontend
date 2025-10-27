// Sentraliserte typer og konstanter (1:1 med backend) for rekrutteringstreff-domenet

// Jobbsøker-hendelser
export const JobbsøkerHendelsestype = {
  OPPRETTET: 'OPPRETTET',
  OPPDATERT: 'OPPDATERT',
  SLETTET: 'SLETTET',
  INVITERT: 'INVITERT',
  MØTT_OPP: 'MØTT_OPP',
  IKKE_MØTT_OPP: 'IKKE_MØTT_OPP',
  SVART_JA_TIL_INVITASJON: 'SVART_JA_TIL_INVITASJON',
  SVART_NEI_TIL_INVITASJON: 'SVART_NEI_TIL_INVITASJON',
  AKTIVITETSKORT_OPPRETTELSE_FEIL: 'AKTIVITETSKORT_OPPRETTELSE_FEIL',
} as const;
export type JobbsøkerHendelsestype =
  (typeof JobbsøkerHendelsestype)[keyof typeof JobbsøkerHendelsestype];

// Arbeidsgiver-hendelser
export const ArbeidsgiverHendelsestype = {
  OPPRETTET: 'OPPRETTET',
  OPPDATERT: 'OPPDATERT',
  SLETTET: 'SLETTET',
} as const;
export type ArbeidsgiverHendelsestype =
  (typeof ArbeidsgiverHendelsestype)[keyof typeof ArbeidsgiverHendelsestype];

// Rekrutteringstreff-hendelser
export const RekrutteringstreffHendelsestype = {
  OPPRETTET: 'OPPRETTET',
  OPPDATERT: 'OPPDATERT',
  SLETTET: 'SLETTET',
  PUBLISERT: 'PUBLISERT',
  GJENÅPNET: 'GJENÅPNET',
  FULLFØRT: 'FULLFØRT',
  AVLYST: 'AVLYST',
  AVPUBLISERT: 'AVPUBLISERT',
} as const;
export type RekrutteringstreffHendelsestype =
  (typeof RekrutteringstreffHendelsestype)[keyof typeof RekrutteringstreffHendelsestype];

// Aktørtyper
export const AktørType = {
  ARRANGØR: 'ARRANGØR',
  JOBBSØKER: 'JOBBSØKER',
  ARBEIDSGIVER: 'ARBEIDSGIVER',
} as const;
export type AktørType = (typeof AktørType)[keyof typeof AktørType];

// Steg/status for stegviseren på treff
export const AktivtSteg = {
  KLADD: 'KLADD',
  INVITERE: 'INVITERE',
  FULLFØRE: 'FULLFØRE',
  AVLYST: 'AVLYST',
  AVPUBLISERT: 'AVPUBLISERT',
} as const;
export type AktivtSteg = (typeof AktivtSteg)[keyof typeof AktivtSteg];

// Hjelpe-sett for logikk knyttet til steg/status (bruker kun rekrutteringstreff-hendelser)
export const RelevanteStegHendelser: ReadonlySet<RekrutteringstreffHendelsestype> =
  new Set([
    RekrutteringstreffHendelsestype.PUBLISERT,
    RekrutteringstreffHendelsestype.FULLFØRT,
    RekrutteringstreffHendelsestype.GJENÅPNET,
    RekrutteringstreffHendelsestype.AVLYST,
    RekrutteringstreffHendelsestype.AVPUBLISERT,
  ]);

// Tekst-labels for hendelsestyper (samlet ett sted for gjenbruk i UI)
export const JobbsøkerHendelsestypeLabel: Record<
  JobbsøkerHendelsestype,
  string
> = {
  [JobbsøkerHendelsestype.OPPRETTET]: 'lagt til',
  [JobbsøkerHendelsestype.OPPDATERT]: 'oppdatert',
  [JobbsøkerHendelsestype.SLETTET]: 'slettet',
  [JobbsøkerHendelsestype.INVITERT]: 'invitert',
  [JobbsøkerHendelsestype.MØTT_OPP]: 'møtt opp',
  [JobbsøkerHendelsestype.IKKE_MØTT_OPP]: 'ikke møtt opp',
  [JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON]: 'svart ja',
  [JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON]: 'svart nei',
  [JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL]:
    'opprettelse feilet',
};

export const ArbeidsgiverHendelsestypeLabel: Record<
  ArbeidsgiverHendelsestype,
  string
> = {
  [ArbeidsgiverHendelsestype.OPPRETTET]: 'lagt til',
  [ArbeidsgiverHendelsestype.OPPDATERT]: 'oppdatert',
  [ArbeidsgiverHendelsestype.SLETTET]: 'slettet',
};

export const RekrutteringstreffHendelsestypeLabel: Record<
  RekrutteringstreffHendelsestype,
  string
> = {
  [RekrutteringstreffHendelsestype.OPPRETTET]: 'lagt til',
  [RekrutteringstreffHendelsestype.OPPDATERT]: 'oppdatert',
  [RekrutteringstreffHendelsestype.SLETTET]: 'slettet',
  [RekrutteringstreffHendelsestype.PUBLISERT]: 'publisert',
  [RekrutteringstreffHendelsestype.AVPUBLISERT]: 'avpublisert',
  [RekrutteringstreffHendelsestype.GJENÅPNET]: 'gjenåpnet',
  [RekrutteringstreffHendelsestype.FULLFØRT]: 'fullført',
  [RekrutteringstreffHendelsestype.AVLYST]: 'avlyst',
};
