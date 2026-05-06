import type { ArbeidsgivereDTO } from './useArbeidsgivere';
import type { ArbeidsgiversBehovDTO } from './useArbeidsgivereMedBehov';

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

const ARBEIDSGIVERS_BEHOV_MOCK: Record<string, ArbeidsgiversBehovDTO> = {
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

export const arbeidsgivereMock = (): ArbeidsgivereDTO => {
  return ARBEIDSGIVERE_MOCK.map((arbeidsgiver) => ({ ...arbeidsgiver }));
};

export const ArbeidsgiversBehovMock = (
  arbeidsgiverTreffId: string,
): ArbeidsgiversBehovDTO | null => {
  const behov = ARBEIDSGIVERS_BEHOV_MOCK[arbeidsgiverTreffId];
  return behov ?? null;
};
