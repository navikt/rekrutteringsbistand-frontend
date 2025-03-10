'use client';

import { getMiljø, Miljø } from '../../util/miljø';
import { rekbisError } from '../../util/rekbisError';
import { DecoratorDTO } from '../api/decorator/decorator.dto';
import Header from '../components/header/Header';
import { Roller } from '../components/tilgangskontroll/roller';
import { Varsling } from '../components/varsling/Varsling';
import { Alert, Heading } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React from 'react';

export type NavKontorMedNavn = {
  navKontor: string;
  navKontorNavn: string | null;
};

interface BrukerData extends DecoratorDTO {
  roller: Roller[];
}

interface ApplikasjonContextType {
  brukerData: BrukerData;
  harRolle: (rolle: Roller[]) => boolean;
  valgtNavKontor: NavKontorMedNavn | null;
  setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
  setValgtFnr: (fnr: string | null) => void;
  valgtFnr: string | null;
  tilUmami: (event: string, data: Record<string, string>) => void;
}

const ApplikasjonContext = React.createContext<ApplikasjonContextType>({
  brukerData: {
    roller: [],
    enheter: [],
    navn: '',
    ident: '',
    fornavn: '',
    etternavn: '',
  },
  harRolle: () => false,
  setValgtNavKontor: () => null,
  setValgtFnr: () => null,
  valgtNavKontor: null,
  valgtFnr: null,
  tilUmami: () => null,
});

interface IApplikasjonContextProvider {
  children: React.ReactNode;
  brukerData: BrukerData;
}

export const ApplikasjonContextProvider: React.FC<
  IApplikasjonContextProvider
> = ({ children, brukerData }) => {
  const [valgtFnr, setValgtFnr] = React.useState<string | null>(null);

  const [valgtNavKontor, setValgtNavKontor] =
    React.useState<NavKontorMedNavn | null>(null);

  const tilUmami = (event: string, data: Record<string, string>) => {
    if (window.umami) {
      window.umami.track(event, data);
    } else {
      logger.warn('Fant ikke umami', { url: window.location.href });
    }
  };

  const harRolle = (rolle: Roller[]) =>
    rolle.some(
      (r) =>
        brukerData?.roller?.includes(r) ||
        brukerData?.roller?.includes(
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
        ),
    );

  const harTilgangTilNyApplikasjon =
    getMiljø() !== Miljø.ProdGcp ||
    valgtNavKontor?.navKontor === '1001' ||
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]);

  return (
    <ApplikasjonContext.Provider
      value={{
        setValgtFnr,
        brukerData,
        setValgtNavKontor,
        valgtNavKontor,
        harRolle,
        valgtFnr,
        tilUmami,
      }}
    >
      <Header />
      <Varsling />
      <main className='mx-auto mb-8 w-[var(--ax-breakpoint-2xl)] p-4'>
        {harTilgangTilNyApplikasjon ? (
          children
        ) : (
          <div>
            <Alert variant='info'>
              <Heading spacing size='small' level='3'>
                Applikasjonen er begrenset
              </Heading>
              Kun enkelte kontor har tilgang til den nye applikasjonen
            </Alert>
          </div>
        )}
      </main>
    </ApplikasjonContext.Provider>
  );
};

export const useApplikasjonContext = () => {
  const context = React.useContext(ApplikasjonContext);
  if (context === undefined) {
    throw new rekbisError({
      beskrivelse:
        'useApplikasjonContext må være i scope: ApplikasjonContextProvider',
    });
  }
  return context;
};
