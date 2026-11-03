export enum StillingsSøkQueryparam {
  // Filtre
  Tekst = 'fritekst',
  Publisert = 'publisert',
  Side = 'side',
  Fylker = 'fylker',
  Kommuner = 'kommuner',
  Statuser = 'statuser',
  Stillingskategorier = 'stillingskategori',
  HovedInkluderingTags = 'inkludering',
  SubInkluderingTags = 'inkluderingUnderkategori',
  Omfang = 'omfang',
  Ansettelsesform = 'ansettelsesform',
  Felter = 'felter',
  Sortering = 'sortering',
  HarKandidatliste = 'utenOppdrag',
  // Valgmuligheter
  BrukStandardsøk = 'brukStandardsok',
  BrukKriterierFraKandidat = 'brukKriterierFraKandidat',
  Portefølje = 'portefolje',
  Modal = 'modal',
}

export enum StillingsSøkOmfang {
  Heltid = 'heltid',
  Deltid = 'deltid',
  IkkeOppgitt = 'ikkeOppgitt',
}

export enum StillingsSøkPortefølje {
  INTERN = 'intern',
  VIS_MINE = 'visMine',
  MITT_KONTOR = 'mittKontor',
  ARBEIDSPLASSEN_NO = 'arbeidsplassen',
}
