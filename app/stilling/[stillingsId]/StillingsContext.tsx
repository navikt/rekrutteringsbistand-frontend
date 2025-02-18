'use client';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useKandidatlisteId } from '../../api/kandidat/useKandidatlisteId';
import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import SWRLaster from '../../components/SWRLaster';
import { eierStilling } from '../../components/tilgangskontroll/erEier';
import { Roller } from '../../components/tilgangskontroll/roller';

interface StillingsContextType {
  stillingsData: StillingsDataDTO;
  forhåndsvisData: StillingsDataDTO | null;
  erFormidling: boolean;
  erEier?: boolean;
  setForhåndsvisData: (data: StillingsDataDTO | null) => void;
  erDirektemeldt: boolean;
  kandidatlisteId: string | null;
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
  const stillingHook = useStilling(stillingsId);
  return (
    <SWRLaster hooks={[stillingHook]}>
      {(data) => (
        <StillingsContextMedData
          key={data?.stilling?.updated}
          data={data}
          refetch={stillingHook.mutate}
        >
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
  const router = useRouter();
  const {
    brukerData: { ident },
    harRolle,
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

  React.useEffect(() => {
    if (stillingsData.stilling.publishedByAdmin) {
      kandidatlisteIdHook.mutate();
    }
  }, [stillingsData.stilling.publishedByAdmin, kandidatlisteIdHook]);

  //TODO Legg inn igjen <:)
  // React.useEffect(() => {
  //   const isFormidling =
  //     stillingsData.stillingsinfo?.stillingskategori === 'FORMIDLING';
  //   const correctPath = isFormidling
  //     ? `/formidlinger/${stillingsData.stilling.uuid}`
  //     : `/stilling/${stillingsData.stilling.uuid}`;

  //   if (!window.location.pathname.includes(correctPath)) {
  //     router.push(correctPath);
  //   }
  // }, [
  //   stillingsData.stillingsinfo?.stillingskategori,
  //   router,
  //   stillingsData.stilling.uuid,
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

  console.log('🎺 stillingsData', stillingsData);
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
