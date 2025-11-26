// Sentraliserte typer og konstanter (1:1 med backend) for rekrutteringstreff-domenet

// Jobbsøker-hendelser
export const JobbsøkerHendelsestype = {
  OPPRETTET: 'OPPRETTET',
  OPPDATERT: 'OPPDATERT',
  SLETTET: 'SLETTET',
  INVITERT: 'INVITERT',
  SVART_JA_TIL_INVITASJON: 'SVART_JA_TIL_INVITASJON',
  SVART_NEI_TIL_INVITASJON: 'SVART_NEI_TIL_INVITASJON',
  SVART_JA_TREFF_AVLYST: 'SVART_JA_TREFF_AVLYST',
  SVART_JA_TREFF_FULLFØRT: 'SVART_JA_TREFF_FULLFØRT',
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
  [JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON]: 'svart ja',
  [JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON]: 'svart nei',
  [JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST]: 'treff avlyst',
  [JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT]: 'treff fullført',
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

export const RekrutteringstreffStatus = {
  KLADD: 'UTKAST',
  PUBLISERT: 'PUBLISERT',
  FULLFØRT: 'FULLFØRT',
  AVLYST: 'AVLYST',
  SLETTET: 'SLETTET',
} as const;

export const JobbsøkerStatus = {
  LAGT_TIL: 'LAGT_TIL',
  INVITERT: 'INVITERT',
  SVART_JA: 'SVART_JA',
  SVART_NEI: 'SVART_NEI',
  SLETTET: 'SLETTET',
} as const;
