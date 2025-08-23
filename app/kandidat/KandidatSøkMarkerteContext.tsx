import { RekbisError } from '@/util/rekbisError';
import * as React from 'react';

interface KandidatSøkMarkerteContextProps {
  markerteKandidater?: string[] | undefined;
  setMarkert: (arenaKandidatnr: string) => void;
  setMarkertListe: (arenaKandidatnr: string[]) => void;
  fjernMarkerteKandidater: () => void;
}

const KandidatSøkMarkerteContext =
  React.createContext<KandidatSøkMarkerteContextProps>({
    markerteKandidater: [],
    setMarkert: () => {},
    setMarkertListe: () => {},
    fjernMarkerteKandidater: () => {},
  });

export const useKandidatSøkMarkerteContext = () => {
  const context = React.useContext(KandidatSøkMarkerteContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useKandidatSøk må være i scope: KandidatSøkProvider',
    });
  }
  return context;
};

export interface KandidatSøkMarkerteContextProviderProps {
  children?: React.ReactNode | undefined;
}

export const KandidatSøkMarkerteContextProvider: React.FC<
  KandidatSøkMarkerteContextProviderProps
> = ({ children }) => {
  const [markerteKandidater, setMarkerteKandidater] = React.useState<string[]>(
    [],
  );

  const setMarkert = (arenaKandidatnr: string) => {
    if (
      markerteKandidater.some((kandidatNr) => arenaKandidatnr === kandidatNr)
    ) {
      setMarkerteKandidater(
        markerteKandidater.filter((k) => k !== arenaKandidatnr),
      );
    } else {
      setMarkerteKandidater([...markerteKandidater, arenaKandidatnr]);
    }
  };

  const fjernMarkerteKandidater = () => {
    setMarkerteKandidater([]);
  };

  return (
    <KandidatSøkMarkerteContext.Provider
      value={{
        markerteKandidater,
        setMarkert,
        fjernMarkerteKandidater,
        setMarkertListe: setMarkerteKandidater,
      }}
    >
      {children}
    </KandidatSøkMarkerteContext.Provider>
  );
};

export default KandidatSøkMarkerteContext;
