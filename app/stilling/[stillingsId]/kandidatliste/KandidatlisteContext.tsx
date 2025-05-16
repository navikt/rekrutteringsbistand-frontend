import { rekbisError } from '../../../../util/rekbisError';
import { ForespurteOmDelingAvCvDTO } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import {
  kandidatlisteSchemaDTO,
  usynligKandidaterSchemaDTO,
} from '../../../api/kandidat/schema.zod';
import { Sms } from '../../../api/kandidatvarsel/kandidatvarsel';
import { useStillingsContext } from '../StillingsContext';
import { KandidatVisningProps } from './components/KandidatlisteFilter/useFiltrerteKandidater';
import OrganisasjonsnummerAlert from './components/OrganisasjonsnummerAlert';
import { mapKandidatListeKandidatTilVisning } from './util';
import * as React from 'react';

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

const KandidatListeContext = React.createContext<
  KandidatlisteContextProps | undefined
>(undefined);

interface KandidatlisteContextProviderProps {
  children?: React.ReactNode | undefined;
  kandidatliste: kandidatlisteSchemaDTO;
  forespurteKandidater: ForespurteOmDelingAvCvDTO;
  beskjeder: Record<string, Sms>;
  reFetchKandidatliste: () => void;
}

export const KandidatlisteContextProvider: React.FC<
  KandidatlisteContextProviderProps
> = ({
  children,
  kandidatliste,
  forespurteKandidater,
  beskjeder,
  reFetchKandidatliste,
}) => {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();
  const [markerteKandidater, setMarkerteKandidater] = React.useState<
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
  const context = React.useContext(KandidatListeContext);
  if (context === undefined) {
    return null;
  }
  return context;
};

export const useKandidatlisteContext = () => {
  const context = React.useContext(KandidatListeContext);
  if (context === undefined) {
    throw new rekbisError({
      beskrivelse:
        'Context er undefined, må være children av KandidatlisteContextProvider.',
    });
  }
  return context;
};
