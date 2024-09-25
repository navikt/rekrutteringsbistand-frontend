'use client';
import React from 'react';
import Sidelaster from '../components/Sidelaster';
import { Rolle } from '../types/Roller';
import { useBruker } from './api/bruker/useBruker';

export type NavKontorMedNavn = {
  navKontor: string;
  navKontorNavn: string | null;
};

interface ApplikasjonContextType {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  roller?: Rolle[];
  navIdent?: string;
  harRolle: (rolle: Rolle[]) => boolean;
  tilgangskontrollErPå: boolean;
  valgtNavKontor: NavKontorMedNavn | null;
  setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
}

const ApplikasjonContext = React.createContext<ApplikasjonContextType>({
  darkMode: true, //todo
  setDarkMode: () => false,
  harRolle: () => false,
  tilgangskontrollErPå: false,
  setValgtNavKontor: () => null,
  valgtNavKontor: null,
});

interface IApplikasjonContextProvider {
  children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<
  IApplikasjonContextProvider
> = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const { isLoading, data } = useBruker();

  const [valgtNavKontor, setValgtNavKontor] =
    React.useState<NavKontorMedNavn | null>(null);

  const tilgangskontrollErPå = true;

  const harRolle = (rolle: Rolle[]) =>
    tilgangskontrollErPå
      ? rolle.some(
          (r) =>
            data?.roller?.includes(r) ||
            data?.roller?.includes(
              Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
            ),
        )
      : true;

  if (isLoading) {
    return <Sidelaster />;
  }

  if (data?.navIdent === undefined) {
    return <span>Feil ved innlasting av bruker</span>;
  }
  return (
    <ApplikasjonContext.Provider
      value={{
        darkMode,
        setDarkMode,
        setValgtNavKontor,
        valgtNavKontor,
        roller: data?.roller,
        navIdent: data?.navIdent,
        harRolle,
        tilgangskontrollErPå,
      }}
    >
      {/* <Header /> */}
      <main>
        <div className='mx-auto p-4 max-w-screen-full'>{children}</div>
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
