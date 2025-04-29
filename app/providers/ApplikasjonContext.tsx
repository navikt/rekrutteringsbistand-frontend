'use client';

import { getMiljø, Miljø } from '../../util/miljø';
import { rekbisError } from '../../util/rekbisError';
import {
  ModiaEventType,
  setModiaContext,
} from '../api/modia/context/setModiaContext';
import { DecoratorDTO } from '../api/modia/decorator/useDecoratorData';
import { Roller } from '../components/tilgangskontroll/roller';
import { Varsling } from '../components/varsling/Varsling';
import { Alert, Heading } from '@navikt/ds-react';
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
}

const ApplikasjonContext = React.createContext<
  ApplikasjonContextType | undefined
>(undefined);

interface IApplikasjonContextProvider {
  children: React.ReactNode;
  brukerData: BrukerData;
  aktivEnhet: string | null;
}

export const ApplikasjonContextProvider: React.FC<
  IApplikasjonContextProvider
> = ({ children, brukerData, aktivEnhet }) => {
  const [valgtFnr, setValgtFnr] = React.useState<string | null>(null);

  const [valgtNavKontor, setValgStatetNavKontor] =
    React.useState<NavKontorMedNavn | null>(null);

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

  const harTilgangTilNyApplikasjon =
    getMiljø() !== Miljø.ProdGcp ||
    valgtNavKontor?.navKontor === '1001' || // Kristiansand
    valgtNavKontor?.navKontor === '1621' || // Ørland
    valgtNavKontor?.navKontor === '0316' || // Gamle Oslo
    valgtNavKontor?.navKontor === '0521' || // Nav Øyer
    valgtNavKontor?.navKontor === '5701' || // FALKENBORG
    valgtNavKontor?.navKontor === '1002' || // LINDESNES
    valgtNavKontor?.navKontor === '0334' || // VESTRE AKER
    valgtNavKontor?.navKontor === '2030' || // SØR-Varanger
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]);

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
        setValgtFnr,
        brukerData,
        setValgtNavKontor,
        valgtNavKontor,
        harRolle,
        valgtFnr,
      }}
    >
      <>
        <Varsling />

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
      </>
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
