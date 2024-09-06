'use client';
import React from 'react';
import Header from '../components/header/Header';
import Sidelaster from '../components/Sidelaster';
import { Rolle } from '../types/Roller';
import { useBruker } from './api/bruker/useBruker';

export type NavKontorMedNavn = {
  navKontor: string;
  navKontorNavn: string | null;
};

interface ApplikasjonContextType {
  roller?: Rolle[];
  navIdent?: string;
  harRolle: (rolle: Rolle[]) => boolean;
  tilgangskontrollErPå: boolean;
  valgtNavKontor: NavKontorMedNavn | null;
  setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
}

export const ApplikasjonContext = React.createContext<ApplikasjonContextType>({
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
        setValgtNavKontor,
        valgtNavKontor,
        roller: data?.roller,
        navIdent: data?.navIdent,
        harRolle,
        tilgangskontrollErPå,
      }}
    >
      <Header />
      <main>
        <div className='mx-auto p-4 max-w-screen-xl'>{children}</div>
      </main>
    </ApplikasjonContext.Provider>
  );
};
