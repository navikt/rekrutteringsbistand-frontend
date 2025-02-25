'use client';
import React, { useMemo } from 'react';

import { useRouter } from 'next/navigation';
import {
  KandidatlisteInfoDTO,
  useKandidatlisteInfo,
} from '../../api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import SWRLaster from '../../components/SWRLaster';
import { eierStilling } from '../../components/tilgangskontroll/erEier';
import { Roller } from '../../components/tilgangskontroll/roller';

interface StillingsContextType {
  stillingsData: StillingsDataDTO;
  kandidatlisteInfo: KandidatlisteInfoDTO | null;
  forhåndsvisData: StillingsDataDTO | null;
  erFormidling: boolean;
  erEier?: boolean;
  setForhåndsvisData: (data: StillingsDataDTO | null) => void;
  erDirektemeldt: boolean;
  refetch: () => void;
  erSlettet: boolean;
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
  const kandidatListeInfo = useKandidatlisteInfo(stillingsId);
  const stillingHook = useStilling(stillingsId);

  return (
    <SWRLaster hooks={[stillingHook]}>
      {(stillingsData) => (
        <StillingsContextMedData
          key={stillingsData?.stilling?.updated}
          initStillingsdata={stillingsData}
          refetch={stillingHook.mutate}
          kandidatlisteInfo={kandidatListeInfo.data ?? null}
        >
          {children}
        </StillingsContextMedData>
      )}
    </SWRLaster>
  );
};

interface StillingsContextMedDataProps {
  initStillingsdata: StillingsDataDTO;
  kandidatlisteInfo: KandidatlisteInfoDTO | null;
  children: React.ReactNode;
  refetch: () => void;
}

const StillingsContextMedData: React.FC<StillingsContextMedDataProps> = ({
  kandidatlisteInfo,
  initStillingsdata,
  children,
  refetch,
}) => {
  const {
    brukerData: { ident },
    harRolle,
  } = useApplikasjonContext();
  const router = useRouter();
  const [forhåndsvisData, setForhåndsvisData] =
    React.useState<StillingsDataDTO | null>(null);

  const [stillingsData, setStillingsData] =
    React.useState<StillingsDataDTO>(initStillingsdata);

  React.useEffect(() => {
    const isFormidling =
      stillingsData.stillingsinfo?.stillingskategori === 'FORMIDLING';
    const correctPath = isFormidling
      ? `/formidlinger/${stillingsData.stilling.uuid}`
      : `/stilling/${stillingsData.stilling.uuid}`;

    if (!window.location.pathname.includes(correctPath)) {
      router.push(correctPath);
    }
  }, [
    stillingsData.stillingsinfo?.stillingskategori,
    router,
    stillingsData.stilling.uuid,
  ]);

  const erEier = useMemo(
    () =>
      harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]) ||
      eierStilling({
        stillingsData: stillingsData,
        navIdent: ident,
      }),
    [stillingsData, ident, harRolle],
  );

  return (
    <StillingsContext.Provider
      value={{
        erSlettet: stillingsData.stilling.status === 'DELETED',
        erDirektemeldt: stillingsData.stilling?.source === 'DIR',
        forhåndsvisData,
        stillingsData: forhåndsvisData ? forhåndsvisData : stillingsData,
        erEier,
        erFormidling:
          stillingsData.stillingsinfo?.stillingskategori === 'FORMIDLING',
        setForhåndsvisData,
        refetch,
        kandidatlisteInfo,
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
