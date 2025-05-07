'use client';

import { rekbisError } from '../../../util/rekbisError';
import {
  KandidatlisteInfoDTO,
  useKandidatlisteInfo,
} from '../../api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import SWRLaster from '../../components/SWRLaster';
import { eierStilling } from '../../components/tilgangskontroll/erEier';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { Stillingskategori } from '../stilling-typer';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface StillingsContextType {
  stillingsId: string;
  stillingsData: StillingsDataDTO;
  kandidatlisteInfo: KandidatlisteInfoDTO | null;
  forhåndsvisData: StillingsDataDTO | null;
  erFormidling: boolean;
  erEier?: boolean;
  setForhåndsvisData: (data: StillingsDataDTO | null) => void;
  erDirektemeldt: boolean;
  refetch: () => void;
  erSlettet: boolean;
  erJobbmesse: boolean;
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

  React.useEffect(() => {
    if (stillingHook.data?.stilling?.updated) {
      kandidatListeInfo?.mutate();
    }
  }, [stillingHook.data?.stilling?.updated, kandidatListeInfo]);

  return (
    <SWRLaster hooks={[stillingHook]}>
      {(stillingsData) => {
        return (
          <StillingsContextMedData
            key={stillingsData?.stilling?.updated}
            stillingsData={stillingsData}
            refetch={stillingHook.mutate}
            kandidatlisteInfo={kandidatListeInfo?.data ?? null}
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
  kandidatlisteInfo: KandidatlisteInfoDTO | null;
  children: React.ReactNode;
  refetch: () => void;
}

const StillingsContextMedData: React.FC<StillingsContextMedDataProps> = ({
  kandidatlisteInfo,
  stillingsData,
  children,
  refetch,
}) => {
  const router = useRouter();
  const {
    brukerData: { ident },
    harRolle,
  } = useApplikasjonContext();
  const [forhåndsvisData, setForhåndsvisData] =
    React.useState<StillingsDataDTO | null>(null);

  React.useEffect(() => {
    const isFormidling =
      stillingsData.stillingsinfo?.stillingskategori === 'FORMIDLING';
    const correctPath = isFormidling
      ? `/etterregistrering/${stillingsData.stilling?.uuid}`
      : `/stilling/${stillingsData.stilling?.uuid}`;

    if (!window.location.pathname.includes(correctPath)) {
      router.push(correctPath);
    }
  }, [
    stillingsData.stillingsinfo?.stillingskategori,
    router,
    stillingsData.stilling?.uuid,
  ]);

  const erJobbmesse =
    stillingsData?.stillingsinfo?.stillingskategori ===
    Stillingskategori.Jobbmesse;

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
        erJobbmesse,
        stillingsId: stillingsData.stilling.uuid,
      }}
    >
      {children}
    </StillingsContext.Provider>
  );
};

export const useNullableStillingsContext = () => {
  const context = React.useContext(StillingsContext);

  if (context === undefined) {
    return null;
  }
  return context;
};

export const useStillingsContext = () => {
  const context = React.useContext(StillingsContext);

  if (context === undefined) {
    throw new rekbisError({
      beskrivelse:
        'useStillingsContext må være i scope: StillingsContextProvider',
    });
  }
  return context;
};
