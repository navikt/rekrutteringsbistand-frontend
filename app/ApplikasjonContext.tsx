'use client';

import React from 'react';
import { isLocal } from '../util/env';
import { DecoratorDTO } from './api/decorator/decorator.dto';
import Header from './components/header/Header';
import { Roller } from './components/tilgangskontroll/roller';
import {
  Varsling,
  VarslingContextProvider,
} from './components/varsling/Varsling';

export type NavKontorMedNavn = {
  navKontor: string;
  navKontorNavn: string | null;
};

export interface BrukerData extends DecoratorDTO {
  roller: Roller[];
}

interface ApplikasjonContextType {
  brukerData: BrukerData;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  harRolle: (rolle: Roller[]) => boolean;
  valgtNavKontor: NavKontorMedNavn | null;
  setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
  setValgtFnr: (fnr: string | null) => void;
  valgtFnr: string | null;
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
  darkMode: true,
  setDarkMode: () => false,
  harRolle: () => false,
  setValgtNavKontor: () => null,
  setValgtFnr: () => null,
  valgtNavKontor: null,
  valgtFnr: null,
});

interface IApplikasjonContextProvider {
  children: React.ReactNode;
  brukerData: BrukerData;
}

export const ApplikasjonContextProvider: React.FC<
  IApplikasjonContextProvider
> = ({ children, brukerData }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const [valgtFnr, setValgtFnr] = React.useState<string | null>(null);

  const [valgtNavKontor, setValgtNavKontor] =
    React.useState<NavKontorMedNavn | null>(
      isLocal
        ? {
            navKontor: '1337',
            navKontorNavn: 'NAV FYA1',
          }
        : null,
    );

  const harRolle = (rolle: Roller[]) =>
    rolle.some(
      (r) =>
        brukerData?.roller?.includes(r) ||
        brukerData?.roller?.includes(
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
        ),
    );

  return (
    <VarslingContextProvider>
      <ApplikasjonContext.Provider
        value={{
          setValgtFnr,
          brukerData,
          darkMode,
          setDarkMode,
          setValgtNavKontor,
          valgtNavKontor,
          harRolle,
          valgtFnr,
        }}
      >
        <Header />
        <Varsling />
        <main>
          <div className='mx-auto p-4 mb-8 max-w-screen-full'>{children}</div>
        </main>
      </ApplikasjonContext.Provider>
    </VarslingContextProvider>
  );
};

export const useApplikasjonContext = () => {
  const context = React.useContext(ApplikasjonContext);
  if (context === undefined) {
    throw new Error(
      'useApplikasjonContext må være i scope: ApplikasjonContextProvider',
    );
  }
  return context;
};
