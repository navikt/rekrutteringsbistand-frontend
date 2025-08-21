'use client';

import { RekbisError } from '../../util/rekbisError';
import {
  ModiaEventType,
  setModiaContext,
} from '../api/context/setModiaContext';
import { DecoratorDTO } from '../api/decorator/useDecoratorData';
import { Roller } from '../components/tilgangskontroll/roller';
import { Alert, AlertProps } from '@navikt/ds-react';
import React from 'react';

export type NavKontorMedNavn = {
  navKontor: string;
  navKontorNavn: string | null;
};

interface BrukerData extends DecoratorDTO {
  roller: Roller[];
}

export interface ApplikasjonsVarsel {
  type: AlertProps['variant'];
  tekst: string;
}

interface ApplikasjonContextType {
  brukerData: BrukerData;
  harRolle: (rolle: Roller[]) => boolean;
  valgtNavKontor: NavKontorMedNavn | null;
  setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
  setValgtFnr: (fnr: string | null) => void;
  valgtFnr: string | null;
  visVarsel: (varsel: ApplikasjonsVarsel) => void;
}

const ApplikasjonContext = React.createContext<
  ApplikasjonContextType | undefined
>(undefined);

interface IApplikasjonContextProvider {
  children: React.ReactNode;
  brukerData: BrukerData;
  aktivEnhet: string | null;
  aktivBruker: string | null;
}

export const ApplikasjonContextProvider: React.FC<
  IApplikasjonContextProvider
> = ({ children, brukerData, aktivEnhet, aktivBruker }) => {
  const [valgtFnr, setValgtFnr] = React.useState<string | null>(aktivBruker);
  const [varsel, setVisVarsel] = React.useState<ApplikasjonsVarsel | null>(
    null,
  );

  const [valgtNavKontor, setValgStatetNavKontor] =
    React.useState<NavKontorMedNavn | null>(null);

  const visVarsel = React.useCallback(
    (varsel: ApplikasjonsVarsel) => {
      setVisVarsel(varsel);
      setTimeout(() => {
        setVisVarsel(null);
      }, 5000);
    },
    [setVisVarsel],
  );

  const setValgtNavKontor = async (navKontor: NavKontorMedNavn | null) => {
    await setModiaContext(
      ModiaEventType.NY_AKTIV_ENHET,
      navKontor?.navKontor ?? 'Ukjent navkontor ID',
    ).then(() => {
      setValgStatetNavKontor(navKontor);
    });
  };

  const harRolle = (rolle: Roller[]) =>
    rolle.some(
      (r) =>
        brukerData?.roller?.includes(r) ||
        brukerData?.roller?.includes(
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
        ),
    );

  React.useEffect(() => {
    setValgStatetNavKontor((navKontor) => {
      if (navKontor?.navKontor === aktivEnhet) {
        return navKontor;
      }
      const nyNavKontor = brukerData.enheter.find(
        (enhet) => enhet.enhetId === aktivEnhet,
      );
      if (nyNavKontor) {
        return {
          navKontor: nyNavKontor.enhetId,
          navKontorNavn: nyNavKontor.navn,
        };
      }
      return null;
    });
  }, [aktivEnhet, brukerData.enheter]);

  return (
    <ApplikasjonContext.Provider
      value={{
        visVarsel,
        setValgtFnr,
        brukerData,
        setValgtNavKontor,
        valgtNavKontor,
        harRolle,
        valgtFnr,
      }}
    >
      <>
        {varsel && (
          <Alert
            fullWidth
            className='fixed top-0 z-100 flex w-full justify-center'
            variant={varsel?.type}
            aria-live='assertive'
          >
            {varsel.tekst}
          </Alert>
        )}

        {children}
      </>
    </ApplikasjonContext.Provider>
  );
};

export const useApplikasjonContext = () => {
  const context = React.useContext(ApplikasjonContext);
  if (context === undefined) {
    throw new RekbisError({
      message:
        'useApplikasjonContext må være i scope: ApplikasjonContextProvider',
    });
  }
  return context;
};
