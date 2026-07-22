import type { ArbeidsgiverDTO, ArbeidsgivereDTO } from './useArbeidsgivere';
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

const arbeidsgiverPool: ArbeidsgiverDTO[] = [
  {
    arbeidsgiverTreffId: 'ag-treff-mock-1',
    organisasjonsnummer: '987654321',
    navn: 'Testbedrift AS',
    status: 'AKTIV',
    gateadresse: 'Storgata 1',
    postnummer: '0182',
    poststed: 'Oslo',
  },
  {
    arbeidsgiverTreffId: 'ag-treff-mock-2',
    organisasjonsnummer: '912345678',
    navn: 'Nordlys Industri AS',
    status: 'AKTIV',
    gateadresse: 'Havnegata 12',
    postnummer: '9008',
    poststed: 'Tromsø',
  },
  {
    arbeidsgiverTreffId: 'ag-treff-mock-3',
    organisasjonsnummer: '923456789',
    navn: 'Fjordgruppen AS',
    status: 'AKTIV',
    gateadresse: 'Strandvegen 7',
    postnummer: '5003',
    poststed: 'Bergen',
  },
  {
    arbeidsgiverTreffId: 'ag-treff-mock-4',
    organisasjonsnummer: '934567890',
    navn: 'Solberg & Co AS',
    status: 'AKTIV',
    gateadresse: 'Bygata 3',
    postnummer: '7010',
    poststed: 'Trondheim',
  },
];

const WORKOP_ARBEIDSGIVERE_MOCK: ArbeidsgivereDTO = Array.from(
  { length: 5 },
  (_, indeks) => ({
    arbeidsgiverTreffId: `workop-arbeidsgiver-test-${indeks + 1}`,
    organisasjonsnummer: `TEST-ORG-WORKOP-${indeks + 1}`,
    navn: `Arbeidsgiver ${indeks + 1}`,
    status: 'AKTIV',
    gateadresse: null,
    postnummer: null,
    poststed: null,
  }),
);

// WorkOp-treffet bruker 5 arbeidsgivere for å demonstrere rom-rotasjonen.
export const workOpArbeidsgivere = (): ArbeidsgivereDTO =>
  WORKOP_ARBEIDSGIVERE_MOCK;

// Deterministisk hash → variabel mellom 1 og 4 basert på treffId
const antallForTreff = (treffId?: string): number => {
  if (!treffId) return 1;
  let sum = 0;
  for (let i = 0; i < treffId.length; i++) {
    sum = (sum + treffId.charCodeAt(i)) % 1000;
  }
  return (sum % 4) + 1;
};

export const arbeidsgivereMock = (treffId?: string): ArbeidsgivereDTO => {
  const antall = antallForTreff(treffId);
  return arbeidsgiverPool.slice(0, antall);
};

export const ArbeidsgiversBehovMock = (
  arbeidsgiverTreffId: string,
): ArbeidsgiversBehovDTO | null => {
  const behov = ARBEIDSGIVERS_BEHOV_MOCK[arbeidsgiverTreffId];
  return behov ?? null;
};
