'use client';

import { rekbisError } from '../../../../util/rekbisError';
import { KandidatDataSchemaDTO } from '../../../api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatinformasjon } from '../../../api/kandidat-sok/useKandidatinformasjon';
import {
  KandidatsammendragDTO,
  useKandidatsammendrag,
} from '../../../api/kandidat-sok/useKandidatsammendrag';
import SWRLaster from '../../../components/SWRLaster';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import React from 'react';

interface KandidatContextType {
  kandidatId: string;
  kandidatData: KandidatDataSchemaDTO;
  kandidatsammendragData: KandidatsammendragDTO;
}

const KandidatContext = React.createContext<KandidatContextType | undefined>(
  undefined,
);

interface KandidatContextProviderProps {
  kandidatId: string;
  children: React.ReactNode;
}
export const KandidatContextProvider: React.FC<
  KandidatContextProviderProps
> = ({ kandidatId, children }) => {
  const kandidatSammendragHook = useKandidatsammendrag(kandidatId);
  return (
    <SWRLaster hooks={[kandidatSammendragHook]}>
      {(data) => (
        <KandidatContextMedData
          kandidatsammendragData={data}
          kandidatId={kandidatId}
        >
          {children}
        </KandidatContextMedData>
      )}
    </SWRLaster>
  );
};

interface KandidatContextMedDataProps {
  kandidatsammendragData: KandidatsammendragDTO;
  children: React.ReactNode;
  kandidatId: string;
}

const KandidatContextMedData: React.FC<KandidatContextMedDataProps> = ({
  kandidatsammendragData,
  children,
  kandidatId,
}) => {
  const kandidatInformasjonHook = useKandidatinformasjon(kandidatId);

  const { setValgtFnr } = useApplikasjonContext();

  React.useEffect(() => {
    if (kandidatsammendragData?.fodselsnummer) {
      setValgtFnr(kandidatsammendragData.fodselsnummer);
    } else {
      setValgtFnr(null);
    }
  }, [kandidatsammendragData, setValgtFnr]);

  return (
    <SWRLaster hooks={[kandidatInformasjonHook]}>
      {(kandidatData) => {
        if (!kandidatData) {
          return null;
        }

        return (
          <KandidatContext.Provider
            value={{
              kandidatId: kandidatId,
              kandidatData: kandidatData as KandidatDataSchemaDTO,
              kandidatsammendragData,
            }}
          >
            {children}
          </KandidatContext.Provider>
        );
      }}
    </SWRLaster>
  );
};

export const useKandidatContext = () => {
  const context = React.useContext(KandidatContext);

  if (context === undefined) {
    throw new rekbisError({
      beskrivelse:
        'useKandidatContext må være i scope: KandidatContextProvider',
    });
  }
  return context;
};
