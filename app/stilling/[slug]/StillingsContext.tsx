'use client';
import React from 'react';
import SWRLaster from '../../../components/SWRLaster';
import { eierStilling } from '../../../components/tilgangskontroll/erEier';
import { useKandidatlisteId } from '../../api/kandidat/useKandidatlisteId';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { stillingSchemaDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/zod';
import { useApplikasjonContext } from '../../ApplikasjonContext';

interface StillingsContextType {
  stillingsData: stillingSchemaDTO;
  erEier?: boolean;
  kandidatlisteId?: string;
  editStillingsData: (field: string, value: any) => void;
}

const StillingsContext = React.createContext<StillingsContextType | undefined>(
  undefined,
);

interface StillingsContextProviderProps {
  stillingsId: string;
  children: React.ReactNode;
}
export const StillingsContextProvider: React.FC<
  StillingsContextProviderProps
> = ({ stillingsId, children }) => {
  const hook = useStilling(stillingsId);
  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <StillingsContextMedData data={data}>
          {children}
        </StillingsContextMedData>
      )}
    </SWRLaster>
  );
};

interface StillingsContextMedDataProps {
  data: stillingSchemaDTO;
  children: React.ReactNode;
}

const StillingsContextMedData: React.FC<StillingsContextMedDataProps> = ({
  data,
  children,
}) => {
  const kandidatListeIdSWR = useKandidatlisteId(data.stilling.uuid ?? '');
  const { navIdent } = useApplikasjonContext();
  const [stillingsData, setStillingsData] =
    React.useState<stillingSchemaDTO>(data);

  // edit deeply nested fields in stillingSchemaDTO
  const editStillingsData = (field: string, value: any) => {
    setStillingsData((prevData) => {
      const newData = { ...prevData };
      const fieldParts = field.split('.');
      let current: any = newData;

      for (let i = 0; i < fieldParts.length - 1; i++) {
        const part = fieldParts[i];
        if (part.includes('[')) {
          const [arrayName, indexStr] = part.split('[');
          const index = parseInt(indexStr.replace(']', ''));
          if (!current[arrayName]) current[arrayName] = [];
          if (!current[arrayName][index]) current[arrayName][index] = {};
          current = current[arrayName][index];
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      }

      current[fieldParts[fieldParts.length - 1]] = value;
      console.log('🎺 newData', newData);
      return newData;
    });
  };

  const erEier = eierStilling({
    stillingsData: stillingsData,
    navIdent: navIdent,
  });

  return (
    <StillingsContext.Provider
      value={{
        stillingsData,
        erEier,
        kandidatlisteId: kandidatListeIdSWR.data?.kandidatlisteId,
        editStillingsData,
      }}
    >
      {children}
    </StillingsContext.Provider>
  );
};

export const useStillingsContext = () => {
  const context = React.useContext(StillingsContext);

  if (context === undefined) {
    throw new Error(
      'useStillingsContext må være i scope: StillingsContextProvider',
    );
  }
  return context;
};
