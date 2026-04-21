'use client';

import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import OrganisasjonsnummerAlert from './_ui/OrganisasjonsnummerAlert';
import { mapKandidatListeKandidatTilVisning } from './util';
import {
  KandidatlisteKandidaterResponseDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { RekbisError } from '@/util/rekbisError';
import { createContext, FC, useContext, useState, type ReactNode } from 'react';

interface KandidatlisteContextProps {
  lukketKandidatliste: boolean;
  markerteKandidater: KandidatVisningProps[];
  setMarkerteKandidater: (val: KandidatVisningProps[]) => void;
  toggleMarkerKandidat: (val: KandidatVisningProps) => void;
  reFetchKandidatliste: () => void;
  kandidatlisteId: string;
  jobbsøkerListe: KandidatVisningProps[];
  usynligeKandidater: usynligKandidaterSchemaDTO[];
  totaltAntallKandidater: number;
}

const KandidatListeContext = createContext<
  KandidatlisteContextProps | undefined
>(undefined);

interface KandidatlisteContextProviderProps {
  children?: ReactNode | undefined;
  jobbSøkere: KandidatlisteKandidaterResponseDTO;
  reFetchKandidatliste: () => void;
}

export const KandidatlisteContextProvider: FC<
  KandidatlisteContextProviderProps
> = ({ children, jobbSøkere, reFetchKandidatliste }) => {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();

  const [markerteKandidater, setMarkerteKandidater] = useState<
    KandidatVisningProps[]
  >([]);

  const lukketKandidatliste =
    kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET';

  const organisasjonsnummerFraKandidatliste = kandidatlisteInfo?.orgnr;
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

  const jobbsøkerListe = jobbSøkere
    ? jobbSøkere.kandidatPersoner.map((person) =>
        mapKandidatListeKandidatTilVisning(
          person.kandidat,
          person.forespørslerOmDelingAvCver,
          person.varsler,
        ),
      )
    : [];

  const usynligeKandidater = jobbSøkere
    ? jobbSøkere.kandidatPersoner
        .map((p) => p.formidlingerAvUsynligKandidat)
        .filter((f): f is NonNullable<typeof f> => f !== null)
    : [];

  if (!kandidatlisteInfo?.kandidatlisteId) {
    //TODO Verifiser at kandidatliste id alltid finnes.
    return null;
  }

  return (
    <KandidatListeContext.Provider
      value={{
        markerteKandidater,
        setMarkerteKandidater,
        lukketKandidatliste,
        reFetchKandidatliste,
        toggleMarkerKandidat,
        kandidatlisteId: kandidatlisteInfo?.kandidatlisteId,
        usynligeKandidater,
        totaltAntallKandidater: jobbSøkere.totaltAntallKandidater,
        jobbsøkerListe,
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
