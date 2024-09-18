'use client';
import React from 'react';
import SWRLaster from '../../../components/SWRLaster';
import { eierStilling } from '../../../components/tilgangskontroll/erEier';
import useKandidatlisteId from '../../api/kandidat-api/useKandidatlisteId';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { stillingSchemaDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/zod';
import { useApplikasjonContext } from '../../ApplikasjonContext';

interface StillingsContextType {
  stillingsData: stillingSchemaDTO;
  erEier?: boolean;
  kandidatlisteId?: string;
  endrerStilling?: boolean;
  setEndrerStilling: (endrerStilling: boolean) => void;
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
  const kandidatListeIdSWR = useKandidatlisteId(data.stilling.uuid);
  const [endrerStilling, setEndrerStilling] = React.useState<boolean>(false);
  const { navIdent } = useApplikasjonContext();
  const [stillingsData, setStillingsData] =
    React.useState<stillingSchemaDTO>(data);

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
        endrerStilling,
        setEndrerStilling,
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
