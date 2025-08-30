import { RekbisError } from '@/util/rekbisError';
import { createContext, FC, useContext, useState, type ReactNode } from 'react';

interface KandidatSøkMarkerteContextProps {
  markerteKandidater?: string[] | undefined;
  setMarkert: (arenaKandidatnr: string) => void;
  setMarkertListe: (arenaKandidatnr: string[]) => void;
  fjernMarkerteKandidater: () => void;
}

const KandidatSøkMarkerteContext =
  createContext<KandidatSøkMarkerteContextProps>({
    markerteKandidater: [],
    setMarkert: () => {},
    setMarkertListe: () => {},
    fjernMarkerteKandidater: () => {},
  });

export const useKandidatSøkMarkerteContext = () => {
  const context = useContext(KandidatSøkMarkerteContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useKandidatSøk må være i scope: KandidatSøkProvider',
    });
  }
  return context;
};

export interface KandidatSøkMarkerteContextProviderProps {
  children?: ReactNode | undefined;
}

export const KandidatSøkMarkerteContextProvider: FC<
  KandidatSøkMarkerteContextProviderProps
> = ({ children }) => {
  const [markerteKandidater, setMarkerteKandidater] = useState<string[]>([]);

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
