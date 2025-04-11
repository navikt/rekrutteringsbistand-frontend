import { rekbisError } from '../../../../util/rekbisError';
import { ForespurteOmDelingAvCvDTO } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../api/kandidat/schema.zod';
import { Sms } from '../../../api/kandidatvarsel/kandidatvarsel';
import { useStillingsContext } from '../StillingsContext';
import OrganisasjonsnummerAlert from './components/OrganisasjonsnummerAlert';
import * as React from 'react';

interface KandidatlisteContextProps {
  forespurteKandidater: ForespurteOmDelingAvCvDTO;
  beskjeder: Record<string, Sms>;
  lukketKandidatliste: boolean;
  kandidatliste: kandidatlisteSchemaDTO;
  markerteKandidater: kandidaterSchemaDTO[];
  setMarkerteKandidater: (val: kandidaterSchemaDTO[]) => void;
  toggleMarkerKandidat: (val: kandidaterSchemaDTO) => void;
  reFetchKandidatliste: () => void;
  filtrerteKandidater?: kandidaterSchemaDTO[];
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
    kandidaterSchemaDTO[]
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

  const toggleMarkerKandidat = (kandidat: kandidaterSchemaDTO) => {
    if (setMarkerteKandidater && markerteKandidater) {
      const nyListe = markerteKandidater.some(
        (k) => k.fodselsnr === kandidat.fodselsnr,
      )
        ? markerteKandidater.filter((k) => k.fodselsnr !== kandidat.fodselsnr)
        : [...markerteKandidater, kandidat];

      setMarkerteKandidater(nyListe);
    }
  };

  const [filterteKandidater, setFilterKandidater] = React.useState([]);



  return (
    <KandidatListeContext.Provider
      value={{
        forespurteKandidater,
        beskjeder,
        markerteKandidater,
        setMarkerteKandidater,
        kandidatliste,
        lukketKandidatliste,
        reFetchKandidatliste,
        toggleMarkerKandidat,
      }}
    >
      {orgnummerDivergererMellomStillingOgKandidatliste && (
        <OrganisasjonsnummerAlert />
      )}
      {children}
    </KandidatListeContext.Provider>
  );
};

export const useKandidatlisteContext = () => {
  const context = React.useContext(KandidatListeContext);
  if (context === undefined) {
    throw new rekbisError({
      beskrivelse:
        'Context er undefined, må være children av KandidatlisteContextProvier.',
    });
  }
  return context;
};
