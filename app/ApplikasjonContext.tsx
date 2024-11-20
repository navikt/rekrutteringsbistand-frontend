'use client';

import React from 'react';
import { Rolle } from '../types/Roller';
import { DecoratorDTO } from './api/decorator/decorator.dto';
// import Header from './components/header/Header';

export type NavKontorMedNavn = {
  navKontor: string;
  navKontorNavn: string | null;
};

interface BrukerData extends DecoratorDTO {
  roller: Rolle[];
}

interface ApplikasjonContextType {
  brukerData: BrukerData;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  harRolle: (rolle: Rolle[]) => boolean;
  valgtNavKontor: NavKontorMedNavn | null;
  setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
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
  darkMode: true, //todo
  setDarkMode: () => false,
  harRolle: () => false,
  setValgtNavKontor: () => null,
  valgtNavKontor: null,
});

interface IApplikasjonContextProvider {
  children: React.ReactNode;
  brukerData: BrukerData;
}

export const ApplikasjonContextProvider: React.FC<
  IApplikasjonContextProvider
> = ({ children, brukerData }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const [valgtNavKontor, setValgtNavKontor] =
    React.useState<NavKontorMedNavn | null>(null);

  const harRolle = (rolle: Rolle[]) =>
    rolle.some(
      (r) =>
        brukerData?.roller?.includes(r) ||
        brukerData?.roller?.includes(
          Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
        ),
    );

  return (
    <ApplikasjonContext.Provider
      value={{
        brukerData,
        darkMode,
        setDarkMode,
        setValgtNavKontor,
        valgtNavKontor,
        harRolle,
      }}
    >
      {/* <Header /> */}
      <main>
        <div className='mx-auto p-4 mb-8 max-w-screen-full'>{children}</div>
      </main>
    </ApplikasjonContext.Provider>
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
