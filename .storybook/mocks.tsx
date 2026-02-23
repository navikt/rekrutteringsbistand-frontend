import { StegviserProvider } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/stegviser/StegviserContext';
import { RekrutteringstreffProvider } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { StillingsContextMedData } from '@/app/stilling/[stillingsId]/StillingsContext';
import { Roller } from '@/components/tilgangskontroll/roller';
import { ApplikasjonContextProvider } from '@/providers/ApplikasjonContext';
import React, { createContext } from 'react';

/**
 * Felles mocks og providere for Storybook.
 * Skal holde props minimale men typesikre.
 */

const DEFAULT_ROLLER: Roller[] = [
  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
];

const defaultBruker = {
  ident: 'X123456',
  fornavn: 'Demo',
  etternavn: 'Bruker',
  navn: 'Demo Bruker',
  roller: DEFAULT_ROLLER,
  enheter: [],
};

export const MockRekrutteringstreffProvider: React.FC<{
  children: React.ReactNode;
  id?: string;
}> = ({ children, id = 'storybook-rekrutteringstreff-id' }) => (
  // ApplikasjonContextProvider må wrappe StegviserProvider fordi useJobbsøkere
  // kaller useApplikasjonContext. Decorators i Storybook kjøres fra bunn til topp,
  // så vi må inkludere den her for at konteksten er tilgjengelig.
  <ApplikasjonContextProvider
    brukerData={defaultBruker as any}
    aktivEnhet={null}
    aktivBruker={null}
  >
    <RekrutteringstreffProvider rekrutteringstreffId={id}>
      <StegviserProvider>{children}</StegviserProvider>
    </RekrutteringstreffProvider>
  </ApplikasjonContextProvider>
);

// Minimal stillingsdata som tilfredsstiller forbrukende komponenter.
const basicStillingsData: any = {
  stilling: {
    uuid: 'storybook-stilling-id',
    updated: new Date().toISOString(),
    administration: { reportee: 'Veileder X' },
    status: 'ACTIVE',
  },
  stillingsinfo: {
    stillingskategori: 'STILLING',
    eierNavn: 'Veileder X',
    eierNavident: 'Z123456',
  },
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
