'use client';
import React from 'react';
import Header from '../components/header/Header';
import Sidelaster from '../components/Sidelaster';
import { Rolle } from '../types/Roller';
import { useBruker } from './api/bruker/useBruker';
import { DecoratorDTO } from './api/decorator/decorator.dto';
import { useDecoratorData } from './api/decorator/useDecoratorData';

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
  tilgangskontrollErPå: boolean;
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
  const { isLoading: isLoadingDecorator, data: decoratorData } =
    useDecoratorData();

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

  if (isLoading || isLoadingDecorator) {
    return <Sidelaster />;
  }

  if (data?.navIdent === undefined) {
    return <span>Feil ved innlasting av bruker</span>;
  }

  const brukerData: BrukerData = decoratorData
    ? {
        ...decoratorData,
        roller: data?.roller,
      }
    : {
        roller: [],
        enheter: [],
        navn: '',
        ident: '',
        fornavn: '',
        etternavn: '',
      };

  return (
    <ApplikasjonContext.Provider
      value={{
        brukerData,
        darkMode,
        setDarkMode,
        setValgtNavKontor,
        valgtNavKontor,
        harRolle,
        tilgangskontrollErPå,
      }}
    >
      <Header />
      <main>
        <div className='mx-auto p-4  mb-8 max-w-screen-full'>{children}</div>
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
