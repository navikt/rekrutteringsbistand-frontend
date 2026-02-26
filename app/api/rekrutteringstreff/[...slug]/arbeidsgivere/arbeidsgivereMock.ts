import type { ArbeidsgivereDTO } from './useArbeidsgivere';

export const arbeidsgivereMock = (): ArbeidsgivereDTO => {
  return [
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
};
