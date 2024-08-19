'use client';
import { Loader } from '@navikt/ds-react';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useBruker } from './api/bruker/bruker';
import { Rolle } from './components/tilgangskontroll/Roller';

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
  // const { navIdent, roller, isLoading } = useMeg();
  const { isLoading, data } = useBruker();

  const roller = [Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER];

  const [valgtNavKontor, setValgtNavKontor] =
    React.useState<NavKontorMedNavn | null>(null);

  const tilgangskontrollErPå = true;

  const harRolle = (rolle: Rolle[]) =>
    tilgangskontrollErPå
      ? rolle.some(
          (r) =>
            roller?.includes(r) ||
            roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)
        )
      : true;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ApplikasjonContext.Provider
      value={{
        setValgtNavKontor,
        valgtNavKontor,
        roller,
        navIdent: data?.navIdent,
        harRolle,
        tilgangskontrollErPå,
      }}
    >
      <ErrorBoundary> {children} </ErrorBoundary>
    </ApplikasjonContext.Provider>
  );
};
