export enum KandidatutfallTyper {
  IKKE_PRESENTERT = 'IKKE_PRESENTERT',
  PRESENTERT = 'PRESENTERT',
  FATT_JOBBEN = 'FATT_JOBBEN',
}

// export enum UtfallsEndringTyper {
//   SVAR_JA = 'SVAR_JA',
//   SVAR_NEI = 'SVAR_NEI',
//   CV_DELT = 'CV_DELT',
//   CV_SLETTET = 'CV_SLETTET',
//   SMS_FEILET = 'SMS_FEILET',
//   SMS_SENDT = 'SMS_SENDT',
//   IKKE_PRESENTERT = 'IKKE_PRESENTERT',
//   PRESENTERT = 'PRESENTERT',
//   FATT_JOBBEN = 'FATT_JOBBEN',
// }

export enum TilstandPåForespørsel {
  KAN_IKKE_OPPRETTE = 'KAN_IKKE_OPPRETTE',
  PROVER_VARSLING = 'PROVER_VARSLING',
  HAR_VARSLET = 'HAR_VARSLET',
  KAN_IKKE_VARSLE = 'KAN_IKKE_VARSLE',
  HAR_SVART = 'HAR_SVART',
  AVBRUTT = 'AVBRUTT',
}

export enum InternKandidatstatus {
  VURDERES = 'VURDERES',
  KONTAKTET = 'KONTAKTET',
  AKTUELL = 'AKTUELL',
  TIL_INTERVJU = 'TIL_INTERVJU',
  UAKTUELL = 'UAKTUELL',
  UINTERESSERT = 'UINTERESSERT',
}

// export const aktivitetTilTekst = {
//   // [UtfallsEndringTyper.DELT_MED_KANDIDAT]: 'Stilling delt med kandidat', //TODO Sjekk opp denne i prod/dev
//   [UtfallsEndringTyper.SVAR_JA]: 'Deling av CV',
//   [UtfallsEndringTyper.SVAR_NEI]: 'Deling av CV',
//   [UtfallsEndringTyper.CV_DELT]: 'CV delt med arbeidsgiver',
//   // [UtfallsEndringTyper.CV_SLETTET]: 'CV er slettet',
//   [UtfallsEndringTyper.FATT_JOBBEN]: 'Fått jobben',
//   // INGEN_AKTIVITET: 'Ingen aktivitet',
// } as const;

// export const varselTilTekst = {
//   [UtfallsEndringTyper.SMS_SENDT]: 'Sendt varsel på SMS',
//   [UtfallsEndringTyper.SMS_FEILET]: 'Varsling på SMS feilet',
//   [TilstandPåForespørsel.KAN_IKKE_VARSLE]: 'Kan ikke varsles',
// } as const;
