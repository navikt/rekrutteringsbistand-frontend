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
  setForhåndsvisData: (data: StillingsDataDTO | null) => void;
  erDirektemeldt: boolean;
  kandidatlisteId: string | null;
  refetch: () => void;
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
        <StillingsContextMedData data={data} refetch={hook.mutate}>
          {children}
        </StillingsContextMedData>
      )}
    </SWRLaster>
  );
};

interface StillingsContextMedDataProps {
  data: StillingsDataDTO;
  children: React.ReactNode;
  refetch: () => void;
}

const StillingsContextMedData: React.FC<StillingsContextMedDataProps> = ({
  data,
  children,
  refetch,
}) => {
  const {
    brukerData: { ident },
  } = useApplikasjonContext();

  const [forhåndsvisData, setForhåndsvisData] =
    React.useState<StillingsDataDTO | null>(null);

  const [stillingsData, setStillingsData] =
    React.useState<StillingsDataDTO>(data);

  const [kandidatlisteId, setKandidatlisteId] = React.useState<string | null>(
    null,
  );

  const kandidatlisteIdHook = useKandidatlisteId(stillingsData.stilling.uuid);

  React.useEffect(() => {
    if (kandidatlisteIdHook.data) {
      setKandidatlisteId(kandidatlisteIdHook.data.kandidatlisteId ?? null);
    }
  }, [kandidatlisteIdHook]);

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
        setForhåndsvisData,
        kandidatlisteId,
        refetch,
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
