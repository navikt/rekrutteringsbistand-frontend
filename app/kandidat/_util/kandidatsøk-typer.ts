/*
 * Parametere og faste filterverdier i kandidatsøket. Ligger utenfor komponentene, så søket, filtrene og
 * lagrede søk kan bruke dem uten sirkulære importer.
 */

export enum KandidatSøkPortefølje {
  MINE_BRUKERE = 'minebrukere',
  VALGTE_KONTORER = 'valgtekontorer',
  MINE_KONTORER = 'minekontorer',
  MITT_KONTOR = 'mittkontor',
  ALLE = 'alle',
}

export enum KandidatSøkQueryparam {
  Fritekst = 'fritekst',
  Side = 'side',
  Portefølje = 'portefolje',
  ValgtKontor = 'kontor',
  Innsatsgruppe = 'innsatsgruppe',
  ØnsketYrke = 'yrke',
  ØnsketSted = 'sted',
  BorPåØnsketSted = 'borDer',
  Kompetanse = 'kompetanse',
  Førerkort = 'forerkort',
  PrioritertMålgruppe = 'malgruppe',
  Hovedmål = 'hovedmal',
  Utdanningsnivå = 'utdanning',
  Arbeidserfaring = 'arbeidserfaring',
  Ferskhet = 'ferskhet',
  Språk = 'sprak',
  Sortering = 'sortering',
  Omfang = 'omfang',
}

export enum Førerkortklasse {
  LettMotorsykkel = 'A1 - Lett motorsykkel',
  MellomtungMotorsykkel = 'A2 - Mellomtung motorsykkel',
  TungMotorsykkel = 'A - Tung motorsykkel',
  Personbil = 'B - Personbil',
  PersonbilMedAutomatgir = 'B 78 - Personbil med automatgir',
  PersonbilMedTilhenger = 'BE - Personbil med tilhenger',
  LettLastebil = 'C1 - Lett lastebil',
  LettLastebilMedTilhenger = 'C1E - Lett lastebil med tilhenger',
  Lastebil = 'C - Lastebil',
  LastebilMedTilhenger = 'CE - Lastebil med tilhenger',
  Minibuss = 'D1 - Minibuss',
  MinibussMedTilhenger = 'D1E - Minibuss med tilhenger',
  Buss = 'D - Buss',
  BussMedTilhenger = 'DE - Buss med tilhenger',
  Traktor = 'T - Traktor',
  Snøscooter = 'S - Snøscooter',
}

export enum HovedMålType {
  SkaffeArbeid = 'SKAFFE_ARBEID',
  BeholdeArbeid = 'BEHOLDE_ARBEID',
  ØkeDeltagelse = 'OKE_DELTAKELSE',
}

export enum OmfangValg {
  HELTID = 'HELTID',
  DELTID = 'DELTID',
  HELTID_ELLER_DELTID = 'HELTID_OG_DELTID',
}

export enum PrioritertMålgruppe {
  UngeUnderTrettiÅr = 'unge',
  SeniorFemtiPluss = 'senior',
  HullICv = 'hullICv',
}

export enum Nivå {
  Videregående = 'videregaende',
  Fagskole = 'fagskole',
  Bachelor = 'bachelor',
  Master = 'master',
  Doktorgrad = 'doktorgrad',
}
