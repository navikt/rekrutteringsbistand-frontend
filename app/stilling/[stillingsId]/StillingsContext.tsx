'use client';

import {
  KandidatlisteInfoDTO,
  useKandidatlisteInfo,
} from '@/app/api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import SWRLaster from '@/components/SWRLaster';
import { eierStilling } from '@/components/tilgangskontroll/erEier';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import {
  createContext,
  FC,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface StillingsContextType {
  omStilling: ReturnType<typeof visStillingsDataInfo>;
  stillingsId: string;
  stillingsData: StillingsDataDTO;
  kandidatlisteInfo: KandidatlisteInfoDTO | null;
  kandidatlisteLaster: boolean;
  forhåndsvisData: StillingsDataDTO | null;
  erEier?: boolean;
  setForhåndsvisData: (data: StillingsDataDTO | null) => void;
  refetch?: () => void;
  refetchKandidatliste?: () => void;
}

const StillingsContext = createContext<StillingsContextType | undefined>(
  undefined,
);

interface StillingsContextProviderProps {
  stillingsId: string;
  children: ReactNode;
}
export const StillingsContextProvider: FC<StillingsContextProviderProps> = ({
  stillingsId,
  children,
}) => {
  const stillingHook = useStilling(stillingsId);

  return (
    <SWRLaster hooks={[stillingHook]}>
      {(stillingsData) => {
        return (
          <StillingsContextMedData
            key={stillingsData?.stilling?.updated}
            stillingsData={stillingsData}
            refetch={stillingHook.mutate}
          >
            {children}
          </StillingsContextMedData>
        );
      }}
    </SWRLaster>
  );
};

interface StillingsContextMedDataProps {
  stillingsData: StillingsDataDTO;
  children: ReactNode;
  refetch?: () => void;
}

export const StillingsContextMedData: FC<StillingsContextMedDataProps> = ({
  stillingsData,
  children,
  refetch,
}) => {
  const {
    brukerData: { ident },
    harRolle,
  } = useApplikasjonContext();
  const kandidatListeInfoHook = useKandidatlisteInfo(
    stillingsData?.stilling?.publishedByAdmin
      ? stillingsData?.stillingsinfo?.stillingsid
      : null,
  );

  const [forhåndsvisData, setForhåndsvisData] =
    useState<StillingsDataDTO | null>(null);

  // React.useEffect(() => {
  //   const isFormidling =
  //     stillingsData.stillingsinfo?.stillingskategori === 'FORMIDLING';
  //   const correctPath = isFormidling
  //     ? `/etterregistrering/${stillingsData.stilling?.uuid}`
  //     : `/stilling/${stillingsData.stilling?.uuid}`;

  //   if (!window.location.pathname.includes(correctPath)) {
  //     router.push(correctPath);
  //   }
  // }, [
  //   stillingsData.stillingsinfo?.stillingskategori,
  //   router,
  //   stillingsData.stilling?.uuid,
  // ]);

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
        omStilling: visStillingsDataInfo(stillingsData),
        stillingsData: forhåndsvisData ? forhåndsvisData : stillingsData,
        erEier,
        stillingsId: stillingsData?.stilling?.uuid,
        forhåndsvisData,
        setForhåndsvisData,
        refetch,
        kandidatlisteInfo: kandidatListeInfoHook?.data ?? null,
        kandidatlisteLaster: kandidatListeInfoHook?.isLoading ?? false,
        refetchKandidatliste: kandidatListeInfoHook?.mutate,
      }}
    >
      {children}
    </StillingsContext.Provider>
  );
};

export const useNullableStillingsContext = () => {
  const context = useContext(StillingsContext);

  if (context === undefined) {
    return null;
  }
  return context;
};

export const useStillingsContext = () => {
  const context = useContext(StillingsContext);

  if (context === undefined) {
    throw new RekbisError({
      message: 'useStillingsContext må være i scope: StillingsContextProvider',
    });
  }
  return context;
};
