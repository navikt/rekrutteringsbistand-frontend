'use client';
import React, { useMemo } from 'react';
import { useKandidatlisteId } from '../../api/kandidat/useKandidatlisteId';
import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import SWRLaster from '../../components/SWRLaster';
import { eierStilling } from '../../components/tilgangskontroll/erEier';

interface StillingsContextType {
  stillingsData: StillingsDataDTO;
  forhåndsvisData: StillingsDataDTO | null;
  erFormidling: boolean;
  erEier?: boolean;
  kandidatlisteId?: string;
  setForhåndsvisData: (data: StillingsDataDTO | null) => void;
  erDirektemeldt: boolean;
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
  data: StillingsDataDTO;
  children: React.ReactNode;
}

const StillingsContextMedData: React.FC<StillingsContextMedDataProps> = ({
  data,
  children,
}) => {
  const kandidatListeIdSWR = useKandidatlisteId(data.stilling.uuid);

  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const [forhåndsvisData, setForhåndsvisData] =
    React.useState<StillingsDataDTO | null>(null);

  const [stillingsData, setStillingsData] =
    React.useState<StillingsDataDTO>(data);

  const erEier = useMemo(
    () =>
      eierStilling({
        stillingsData: stillingsData,
        navIdent: ident,
      }),
    [stillingsData, ident],
  );

  return (
    <StillingsContext.Provider
      value={{
        erDirektemeldt: stillingsData.stilling?.source === 'DIR',
        forhåndsvisData,
        stillingsData: forhåndsvisData ? forhåndsvisData : stillingsData,
        erEier,
        erFormidling:
          stillingsData.stillingsinfo?.stillingskategori === 'FORMIDLING',
        kandidatlisteId: kandidatListeIdSWR.data?.kandidatlisteId,
        setForhåndsvisData,
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
