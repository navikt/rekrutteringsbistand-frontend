// Sentraliserte typer og konstanter (1:1 med backend) for rekrutteringstreff-domenet

// Jobbsøker-hendelser
export const JobbsøkerHendelsestype = {
  OPPRETT: 'OPPRETT',
  OPPDATER: 'OPPDATER',
  SLETT: 'SLETT',
  INVITER: 'INVITER',
  MØT_OPP: 'MØT_OPP',
  IKKE_MØT_OPP: 'IKKE_MØT_OPP',
  SVAR_JA_TIL_INVITASJON: 'SVAR_JA_TIL_INVITASJON',
  SVAR_NEI_TIL_INVITASJON: 'SVAR_NEI_TIL_INVITASJON',
  AKTIVITETSKORT_OPPRETTELSE_FEIL: 'AKTIVITETSKORT_OPPRETTELSE_FEIL',
} as const;
export type JobbsøkerHendelsestype =
  (typeof JobbsøkerHendelsestype)[keyof typeof JobbsøkerHendelsestype];

// Arbeidsgiver-hendelser
export const ArbeidsgiverHendelsestype = {
  OPPRETT: 'OPPRETT',
  OPPDATER: 'OPPDATER',
  SLETT: 'SLETT',
} as const;
export type ArbeidsgiverHendelsestype =
  (typeof ArbeidsgiverHendelsestype)[keyof typeof ArbeidsgiverHendelsestype];

// Rekrutteringstreff-hendelser
export const RekrutteringstreffHendelsestype = {
  OPPRETT: 'OPPRETT',
  OPPDATER: 'OPPDATER',
  SLETT: 'SLETT',
  PUBLISER: 'PUBLISER',
  GJENÅPN: 'GJENÅPN',
  FULLFØR: 'FULLFØR',
  AVLYS: 'AVLYS',
  AVPUBLISER: 'AVPUBLISER',
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
  PUBLISERE: 'PUBLISERE',
  INVITERE: 'INVITERE',
  FULLFØRE: 'FULLFØRE',
  AVLYST: 'AVLYST',
  AVPUBLISERT: 'AVPUBLISERT',
} as const;
export type AktivtSteg = (typeof AktivtSteg)[keyof typeof AktivtSteg];

// Hjelpe-sett for logikk knyttet til steg/status (bruker kun rekrutteringstreff-hendelser)
export const RelevanteStegHendelser: ReadonlySet<RekrutteringstreffHendelsestype> =
  new Set([
    RekrutteringstreffHendelsestype.PUBLISER,
    RekrutteringstreffHendelsestype.FULLFØR,
    RekrutteringstreffHendelsestype.GJENÅPN,
    RekrutteringstreffHendelsestype.AVLYS,
    RekrutteringstreffHendelsestype.AVPUBLISER,
  ]);

// Tekst-labels for hendelsestyper (samlet ett sted for gjenbruk i UI)
export const JobbsøkerHendelsestypeLabel: Record<
  JobbsøkerHendelsestype,
  string
> = {
  [JobbsøkerHendelsestype.OPPRETT]: 'lagt til',
  [JobbsøkerHendelsestype.OPPDATER]: 'oppdatert',
  [JobbsøkerHendelsestype.SLETT]: 'slettet',
  [JobbsøkerHendelsestype.INVITER]: 'invitert',
  [JobbsøkerHendelsestype.MØT_OPP]: 'møtt opp',
  [JobbsøkerHendelsestype.IKKE_MØT_OPP]: 'møtte ikke',
  [JobbsøkerHendelsestype.SVAR_JA_TIL_INVITASJON]: 'svart ja',
  [JobbsøkerHendelsestype.SVAR_NEI_TIL_INVITASJON]: 'svart nei',
  [JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL]:
    'opprettelse feilet',
};

export const ArbeidsgiverHendelsestypeLabel: Record<
  ArbeidsgiverHendelsestype,
  string
> = {
  [ArbeidsgiverHendelsestype.OPPRETT]: 'lagt til',
  [ArbeidsgiverHendelsestype.OPPDATER]: 'oppdatert',
  [ArbeidsgiverHendelsestype.SLETT]: 'slettet',
};

export const RekrutteringstreffHendelsestypeLabel: Record<
  RekrutteringstreffHendelsestype,
  string
> = {
  [RekrutteringstreffHendelsestype.OPPRETT]: 'lagt til',
  [RekrutteringstreffHendelsestype.OPPDATER]: 'oppdatert',
  [RekrutteringstreffHendelsestype.SLETT]: 'slettet',
  [RekrutteringstreffHendelsestype.PUBLISER]: 'publisert',
  [RekrutteringstreffHendelsestype.AVPUBLISER]: 'avpublisert',
  [RekrutteringstreffHendelsestype.GJENÅPN]: 'gjenåpnet',
  [RekrutteringstreffHendelsestype.FULLFØR]: 'fullført',
  [RekrutteringstreffHendelsestype.AVLYS]: 'avlyst',
};
