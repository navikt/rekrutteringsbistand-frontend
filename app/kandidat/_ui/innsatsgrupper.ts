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
  [Innsatsgruppe.STANDARD_INNSATS]: {
    label: 'Gode muligheter',
    description: '(standard)',
  },
  [Innsatsgruppe.SITUASJONSBESTEMT_INNSATS]: {
    label: 'Trenger veiledning',
    description: '(situasjonsbestemt)',
  },
  [Innsatsgruppe.SPESIELT_TILPASSET_INNSATS]: {
    label: 'Trenger veiledning, nedsatt arbeidsevne',
    description: '(spesielt tilpasset)',
  },
  [Innsatsgruppe.GRADERT_VARIG_TILPASSET_INNSATS]: {
    label: 'Jobbe delvis',
    description: '(delvis varig tilpasset, kun ny løsning)',
  },
  [Innsatsgruppe.VARIG_TILPASSET_INNSATS]: {
    label: 'Liten mulighet til å jobbe',
    description: '(varig tilpasset)',
  },

  [FiltrerbarInnsatsgruppe.IkkeVurdert]: {
    label: 'Ikke vurdert',
    description: '',
  },
};

export const alleInnsatsgrupper = {
  ...filtrerbareInnsatsgrupper,
};
