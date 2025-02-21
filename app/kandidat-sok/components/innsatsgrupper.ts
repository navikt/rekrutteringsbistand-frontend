export enum FiltrerbarInnsatsgruppe {
  Innsatsgruppe,
  IkkeVurdert = 'HAR_IKKE_GJELDENDE_14A_VEDTAK',
}

export enum Innsatsgruppe {
  SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
  SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
  STANDARD_INNSATS = 'STANDARD_INNSATS',
  VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS',
  GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
  HAR_IKKE_GJELDENDE_14A_VEDTAK = 'HAR_IKKE_GJELDENDE_14A_VEDTAK',
}

export const filtrerbareInnsatsgrupper = {
  [Innsatsgruppe.SITUASJONSBESTEMT_INNSATS]: {
    label: 'Situasjonsbestemt innsats',
    description: 'Trenger veiledning',
  },
  [Innsatsgruppe.SPESIELT_TILPASSET_INNSATS]: {
    label: 'Spesielt tilpasset innsats',
    description: 'Trenger veiledning, nedsatt arbeidsevne',
  },
  [Innsatsgruppe.GRADERT_VARIG_TILPASSET_INNSATS]: {
    label: 'Delvis varig tilpasset innsats',
    description: 'Jobbe delvis',
  },
  [Innsatsgruppe.VARIG_TILPASSET_INNSATS]: {
    label: 'Varig tilpasset innsats',
    description: 'Liten mulighet til å jobbe',
  },
  [Innsatsgruppe.STANDARD_INNSATS]: {
    label: 'Standard innsats',
    description: 'Gode muligheter',
  },
  [FiltrerbarInnsatsgruppe.IkkeVurdert]: {
    label: 'Ikke vurdert',
    description: '',
  },
};

export const alleInnsatsgrupper = {
  ...filtrerbareInnsatsgrupper,
};
