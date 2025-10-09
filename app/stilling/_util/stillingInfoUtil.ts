import { Stillingskategori, StillingsStatus } from '../_ui/stilling-typer';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { startOfDay } from 'date-fns';

// Nye visningsstatuser (erstatter tidligere kombinasjoner av boolean-flagg i UI)
// 'StillingsTag' komponenten er i ferd med å deprekeres – behold gamle flagg midlertidig for bakoverkompabilitet.
export enum VisningsStatus {
  IkkePublisert = 'Ikke publisert',
  ApenForSokere = 'Åpen for søkere',
  StengtForSokere = 'Stengt for søkere',
  UtloptStengtForSokere = 'Utløpt - Stengt for søkere',
  Fullfort = 'Fullført',
  Slettet = 'Slettet',
  Ukjent = 'Ukjent status',
}

type StillingsDataInfo = {
  erFormidling: boolean;
  erJobbMesse: boolean;
  erPåArbeidsplassen: boolean;
  erDirektemeldt: boolean;
  erJobbmesse: boolean;
  visningsStatus: VisningsStatus;
};

export const visStillingsDataInfo = (
  stillingsData: RekrutteringsbistandStillingSchemaDTO | StillingsDataDTO,
): StillingsDataInfo => {
  const stilling = stillingsData.stilling;
  const stillingStatus = stilling.status as StillingsStatus;

  const published: string | null = stilling.published ?? null;
  const expires: string | null = stilling.expires ?? null;
  const publishedByAdmin = stilling.publishedByAdmin ?? null;
  const harStillingsinfo = stillingsData.stillingsinfo !== null;

  const erUtløpt = () => {
    if (expires === null) {
      return false;
    }

    const startenAvDøgnet = startOfDay(new Date());
    return new Date(expires) <= startenAvDøgnet;
  };

  let visningsStatus: VisningsStatus = VisningsStatus.Ukjent;

  if (stillingStatus === StillingsStatus.Slettet) {
    visningsStatus = VisningsStatus.Slettet;
  } else if (
    stillingStatus === StillingsStatus.Stoppet &&
    publishedByAdmin !== null &&
    published !== null
  ) {
    visningsStatus = VisningsStatus.Fullfort;
  } else if (
    stillingStatus === StillingsStatus.Inaktiv &&
    publishedByAdmin !== null &&
    erUtløpt()
  ) {
    visningsStatus = VisningsStatus.UtloptStengtForSokere;
  } else if (
    stillingStatus === StillingsStatus.Inaktiv &&
    publishedByAdmin !== null
  ) {
    visningsStatus = VisningsStatus.StengtForSokere;
  } else if (
    stillingStatus === StillingsStatus.Aktiv &&
    publishedByAdmin !== null &&
    published !== null &&
    harStillingsinfo
  ) {
    visningsStatus = VisningsStatus.ApenForSokere;
  } else if (
    stillingStatus === StillingsStatus.Inaktiv &&
    publishedByAdmin === null
  ) {
    visningsStatus = VisningsStatus.IkkePublisert;
  }

  return {
    erJobbmesse:
      stillingsData?.stillingsinfo?.stillingskategori ===
      Stillingskategori.Jobbmesse,
    erFormidling:
      stillingsData?.stillingsinfo?.stillingskategori ===
      Stillingskategori.Formidling,
    erJobbMesse:
      stillingsData?.stillingsinfo?.stillingskategori ===
      Stillingskategori.Jobbmesse,
    erPåArbeidsplassen: stillingsData?.stilling?.privacy === 'SHOW_ALL',
    erDirektemeldt: stillingsData?.stilling?.source === 'DIR',
    // Ny status
    visningsStatus,
  };
};
