'use client';
import Script from 'next/script';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Rolle } from './tilgangskontroll/Roller';

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
  const navIdent = 'Z123456';
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

  const scriptSrc =
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js';
  const linkHref =
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css';
  return (
    <ApplikasjonContext.Provider
      value={{
        setValgtNavKontor,
        valgtNavKontor,
        roller,
        navIdent,
        harRolle,
        tilgangskontrollErPå,
      }}
    >
      <Script src={scriptSrc}></Script>
      <link rel='stylesheet' href={linkHref} />
      <ErrorBoundary> {children} </ErrorBoundary>
    </ApplikasjonContext.Provider>
  );
};
