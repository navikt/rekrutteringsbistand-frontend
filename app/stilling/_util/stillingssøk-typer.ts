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
  BrukKriterierFraKandidat = 'brukKriterierFraKandidat',
  Portefølje = 'portefolje',
  Modal = 'modal',
}

export enum StillingsSøkOmfang {
  Heltid = 'heltid',
  Deltid = 'deltid',
}

export enum StillingsSøkPortefølje {
  INTERN = 'intern',
  VIS_MINE = 'visMine',
  MITT_KONTOR = 'mittKontor',
  ARBEIDSPLASSEN_NO = 'arbeidsplassen',
}
