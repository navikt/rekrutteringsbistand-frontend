import type { ArbeidsgiverBehovDTO } from './useArbeidsgivereMedBehov';
import type { ArbeidsgivereDTO } from './useArbeidsgivere';

const ARBEIDSGIVERE_MOCK: ArbeidsgivereDTO = [
  {
    arbeidsgiverTreffId: 'ag-treff-mock-1',
    organisasjonsnummer: '987654321',
    navn: 'Testbedrift AS',
    status: 'AKTIV',
    gateadresse: 'Storgata 1',
    postnummer: '0182',
    poststed: 'Oslo',
  },
];

const ARBEIDSGIVER_BEHOV_MOCK: Record<string, ArbeidsgiverBehovDTO> = {
  'ag-treff-mock-1': {
    samledeKvalifikasjoner: [
      {
        label: 'Kundeservice',
        kategori: 'KOMPETANSE',
        konseptId: 101,
      },
    ],
    arbeidssprak: ['Norsk'],
    antall: 3,
    ansettelsesformer: ['Fast'],
    personligeEgenskaper: [
      {
        label: 'Samarbeidsevne',
        kategori: 'PERSONLIG_EGENSKAP',
        konseptId: 201,
      },
    ],
  },
};

const kopierBehov = (behov: ArbeidsgiverBehovDTO): ArbeidsgiverBehovDTO => ({
  samledeKvalifikasjoner: behov.samledeKvalifikasjoner.map((tag) => ({
    ...tag,
  })),
  arbeidssprak: [...behov.arbeidssprak],
  antall: behov.antall,
  ansettelsesformer: [...behov.ansettelsesformer],
  personligeEgenskaper: (behov.personligeEgenskaper ?? []).map((tag) => ({
    ...tag,
  })),
});

export const arbeidsgivereMock = (): ArbeidsgivereDTO => {
  return ARBEIDSGIVERE_MOCK.map((arbeidsgiver) => ({ ...arbeidsgiver }));
};

export const arbeidsgiverBehovMock = (
  arbeidsgiverTreffId: string,
): ArbeidsgiverBehovDTO | null => {
  const behov = ARBEIDSGIVER_BEHOV_MOCK[arbeidsgiverTreffId];
  return behov ? kopierBehov(behov) : null;
};
