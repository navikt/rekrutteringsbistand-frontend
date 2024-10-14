'use client';
import React from 'react';
import SWRLaster from '../../../components/SWRLaster';
import { KandidatDataSchemaDTO } from '../../api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatinformasjon } from '../../api/kandidat-sok/useKandidatinformasjon';
import {
  KandidatsammendragDTO,
  useKandidatsammendrag,
} from '../../api/kandidat-sok/useKandidatsammendrag';

interface KandidatContextType {
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
  const hook = useKandidatsammendrag(kandidatId);
  return (
    <SWRLaster hook={hook}>
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
  const hook = useKandidatinformasjon(kandidatId);
  return (
    <SWRLaster hook={hook}>
      {(kandidatData) => {
        if (!kandidatData) {
          return null;
        }

        return (
          <KandidatContext.Provider
            value={{
              kandidatData: kandidatData as KandidatDataSchemaDTO, // todo hvorfor må vi gjøre dette?
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
    throw new Error(
      'useKandidatContext må være i scope: KandidatContextProvider',
    );
  }
  return context;
};
