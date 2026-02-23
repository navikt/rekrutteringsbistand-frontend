'use client';

import { RekbisError } from '@/util/rekbisError';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export interface MarkertKandidat {
  arenaKandidatnr: string;
  fodselsnummer: string | null;
  fornavn: string | null;
  etternavn: string | null;
}

interface KandidatSøkMarkerteContextProps {
  markerteKandidater: MarkertKandidat[];
  setMarkert: (kandidat: MarkertKandidat) => void;
  setMarkertListe: (kandidater: MarkertKandidat[]) => void;
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
  const [markerteKandidater, setMarkerteKandidater] = useState<
    MarkertKandidat[]
  >([]);

  const setMarkert = useCallback((kandidat: MarkertKandidat) => {
    setMarkerteKandidater((prev) => {
      if (prev.some((k) => k.arenaKandidatnr === kandidat.arenaKandidatnr)) {
        return prev.filter(
          (k) => k.arenaKandidatnr !== kandidat.arenaKandidatnr,
        );
      }
      return [...prev, kandidat];
    });
  }, []);

  const fjernMarkerteKandidater = useCallback(() => {
    setMarkerteKandidater([]);
  }, []);

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
