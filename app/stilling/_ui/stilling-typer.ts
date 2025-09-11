export enum StillingsStatus {
  Aktiv = 'ACTIVE',
  Inaktiv = 'INACTIVE',
  Stoppet = 'STOPPED',
  Avslått = 'REJECTED',
  Slettet = 'DELETED',
}

export enum AdminStatus {
  Received = 'RECEIVED',
  Pending = 'PENDING',
  Done = 'DONE',
}

export enum Stillingskategori {
  Stilling = 'STILLING',
  Arbeidstrening = 'ARBEIDSTRENING',
  Jobbmesse = 'JOBBMESSE',
  Formidling = 'FORMIDLING',
}

export enum StillingsAnsettelsesform {
  Fast = 'Fast',
  Vikariat = 'Vikariat',
  Engasjement = 'Engasjement',
  Prosjekt = 'Prosjekt',
  Åremål = 'Åremål',
  Sesong = 'Sesong',
  Feriejobb = 'Feriejobb',
  Trainee = 'Trainee',
  Lærling = 'Lærling',
  Selvstendig = 'Selvstendig næringsdrivende',
  Annet = 'Annet',
}

export enum StillingsArbeidstidsordning {
  Skift = 'Skift',
  Turnus = 'Turnus',
  Vakt = 'Vakt',
}
