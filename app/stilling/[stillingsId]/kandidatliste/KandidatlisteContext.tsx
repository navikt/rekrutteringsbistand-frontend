'use client';

import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import OrganisasjonsnummerAlert from './_ui/OrganisasjonsnummerAlert';
import { mapKandidatListeKandidatTilVisning } from './util';
import { ForespurteOmDelingAvCvDTO } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import {
  kandidatlisteSchemaDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import { Sms } from '@/app/api/kandidatvarsel/kandidatvarsel';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { RekbisError } from '@/util/rekbisError';
import { createContext, FC, useContext, useState, type ReactNode } from 'react';

interface KandidatlisteContextProps {
  forespurteKandidater: ForespurteOmDelingAvCvDTO;
  beskjeder: Record<string, Sms>;
  lukketKandidatliste: boolean;
  markerteKandidater: KandidatVisningProps[];
  setMarkerteKandidater: (val: KandidatVisningProps[]) => void;
  toggleMarkerKandidat: (val: KandidatVisningProps) => void;
  reFetchKandidatliste: () => void;
  kandidatlisteId: string;
  kandidater: KandidatVisningProps[];
  usynligeKandidater: usynligKandidaterSchemaDTO[];
  kandidatlisteRawData: kandidatlisteSchemaDTO;
}

const KandidatListeContext = createContext<
  KandidatlisteContextProps | undefined
>(undefined);

interface KandidatlisteContextProviderProps {
  children?: ReactNode | undefined;
  kandidatliste: kandidatlisteSchemaDTO;
  forespurteKandidater: ForespurteOmDelingAvCvDTO;
  beskjeder: Record<string, Sms>;
  reFetchKandidatliste: () => void;
}

export const KandidatlisteContextProvider: FC<
  KandidatlisteContextProviderProps
> = ({
  children,
  kandidatliste,
  forespurteKandidater,
  beskjeder,
  reFetchKandidatliste,
}) => {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();
  const [markerteKandidater, setMarkerteKandidater] = useState<
    KandidatVisningProps[]
  >([]);

  const lukketKandidatliste =
    kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET';

  const organisasjonsnummerFraKandidatliste =
    kandidatliste?.organisasjonReferanse;
  const organisasjonsnummerFraStilling =
    stillingsData?.stilling?.employer?.orgnr;

  const orgnummerDivergererMellomStillingOgKandidatliste: boolean = Boolean(
    organisasjonsnummerFraKandidatliste &&
      organisasjonsnummerFraStilling &&
      organisasjonsnummerFraKandidatliste !== organisasjonsnummerFraStilling,
  );

  const toggleMarkerKandidat = (kandidat: KandidatVisningProps) => {
    if (setMarkerteKandidater && markerteKandidater) {
      const nyListe = markerteKandidater.some(
        (k) => k.fodselsnr === kandidat.fodselsnr,
      )
        ? markerteKandidater.filter((k) => k.fodselsnr !== kandidat.fodselsnr)
        : [...markerteKandidater, kandidat];

      setMarkerteKandidater(nyListe);
    }
  };

  const kandidater = kandidatliste.kandidater
    ? kandidatliste.kandidater.map((kandidat) =>
        mapKandidatListeKandidatTilVisning(
          kandidat,
          forespurteKandidater,
          beskjeder,
        ),
      )
    : [];

  return (
    <KandidatListeContext.Provider
      value={{
        forespurteKandidater,
        beskjeder,
        markerteKandidater,
        setMarkerteKandidater,
        lukketKandidatliste,
        reFetchKandidatliste,
        toggleMarkerKandidat,
        kandidatlisteId: kandidatliste.kandidatlisteId,
        usynligeKandidater: kandidatliste.formidlingerAvUsynligKandidat,
        kandidater,
        kandidatlisteRawData: kandidatliste,
      }}
    >
      {orgnummerDivergererMellomStillingOgKandidatliste && (
        <OrganisasjonsnummerAlert />
      )}
      {children}
    </KandidatListeContext.Provider>
  );
};

export const useNullableKandidatlisteContext = () => {
  const context = useContext(KandidatListeContext);
  if (context === undefined) {
    return null;
  }
  return context;
};

export const useKandidatlisteContext = () => {
  const context = useContext(KandidatListeContext);
  if (context === undefined) {
    throw new RekbisError({
      message:
        'Context er undefined, må være children av KandidatlisteContextProvider.',
    });
  }
  return context;
};
