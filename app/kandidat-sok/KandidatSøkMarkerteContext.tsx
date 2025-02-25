import * as React from 'react';
import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';

interface KandidatSøkMarkerteContextProps {
  markerteKandidater?: KandidatDataSchemaDTO[] | undefined;
  setMarkert: (kandidat: KandidatDataSchemaDTO) => void;
}

const KandidatSøkMarkerteContext =
  React.createContext<KandidatSøkMarkerteContextProps>({
    markerteKandidater: [],
    setMarkert: () => {},
  });

export const useKandidatSøkMarkerteContext = () => {
  const context = React.useContext(KandidatSøkMarkerteContext);
  if (context === undefined) {
    throw new Error('useKandidatSøk må være i scope: KandidatSøkProvider');
  }
  return context;
};

export interface KandidatSøkMarkerteContextProviderProps {
  children?: React.ReactNode | undefined;
}

export const KandidatSøkMarkerteContextProvider: React.FC<
  KandidatSøkMarkerteContextProviderProps
> = ({ children }) => {
  const [markerteKandidater, setMarkerteKandidater] = React.useState<
    KandidatDataSchemaDTO[]
  >([]);

  const setMarkert = (kandidat: KandidatDataSchemaDTO) => {
    if (
      markerteKandidater.some(
        (k) => kandidat.arenaKandidatnr === k.arenaKandidatnr,
      )
    ) {
      setMarkerteKandidater(
        markerteKandidater.filter(
          (k) => k.arenaKandidatnr !== kandidat.arenaKandidatnr,
        ),
      );
    } else {
      setMarkerteKandidater([...markerteKandidater, kandidat]);
    }
  };

  return (
    <KandidatSøkMarkerteContext.Provider
      value={{ markerteKandidater, setMarkert }}
    >
      {children}
    </KandidatSøkMarkerteContext.Provider>
  );
};

export default KandidatSøkMarkerteContext;
