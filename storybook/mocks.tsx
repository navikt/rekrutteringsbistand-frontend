import { RekrutteringstreffProvider } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { StillingsContextMedData } from '@/app/stilling/[stillingsId]/StillingsContext';
import React, { createContext } from 'react';

/**
 * Felles mocks og providere for Storybook.
 * Skal holde props minimale men typesikre.
 */

export const MockRekrutteringstreffProvider: React.FC<{
  children: React.ReactNode;
  id?: string;
}> = ({ children, id = 'storybook-rekrutteringstreff-id' }) => (
  <RekrutteringstreffProvider rekrutteringstreffId={id}>
    {children}
  </RekrutteringstreffProvider>
);

// Minimal stillingsdata som tilfredsstiller forbrukende komponenter.
const basicStillingsData: any = {
  stilling: {
    uuid: 'storybook-stilling-id',
    updated: new Date().toISOString(),
    administration: { reportee: 'Veileder X' },
    status: 'ACTIVE',
  },
  stillingsinfo: { stillingskategori: 'STILLING' },
};

export const MockStillingsProvider: React.FC<{
  children: React.ReactNode;
  data?: any;
}> = ({ children, data = basicStillingsData }) => (
  <StillingsContextMedData stillingsData={data}>
    {children}
  </StillingsContextMedData>
);

// Generiske no-op funksjoner for callbacks
export const noop = () => {};

// Eksempel på felles tallverdier brukt i flere komponenter
export const stillingStatistikk = {
  antallFåttJobben: 1,
  antallDelt: 2,
  totalStillinger: 5,
};

// Dummy ref
export const dummyRef = { current: null } as React.RefObject<any>;

// Kandidat mock (for enkle visningskomponenter som kun trenger navn ++)
export const kandidatMock: any = {
  kandidatId: 'kand-1',
  fornavn: 'Kari',
  etternavn: 'Nordmann',
  beskrivelse: 'Erfaren utvikler med fokus på tilgjengelighet.',
  sprak: [],
  godkjenninger: [],
  kompetanse: [],
};
// Minimal mock av KandidatContext uten API-kall
export const KandidatContext = createContext<any | undefined>(undefined);
export const KandidatMockProvider: React.FC<{
  children: React.ReactNode;
  kandidat?: any;
}> = ({ children, kandidat = kandidatMock }) => (
  <KandidatContext.Provider
    value={{ kandidatId: kandidat.kandidatId, kandidatData: kandidat }}
  >
    {children}
  </KandidatContext.Provider>
);
