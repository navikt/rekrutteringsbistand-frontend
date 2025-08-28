import { Stillingskategori, StillingsStatus } from '../_ui/stilling-typer';
import { stillingErUtløpt } from './stilling-util';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';

type StillingsDataInfo = {
  erUtløpt: boolean;
  erFormidling: boolean;
  erPublisert: boolean;
  erUtkast: boolean;
  erStoppet: boolean;
  erSlettet: boolean;
  erJobbMesse: boolean;
  erPåArbeidsplassen: boolean;
  erDirektemeldt: boolean;
};

export const visStillingsDataInfo = (
  stillingsData: RekrutteringsbistandStillingSchemaDTO | StillingsDataDTO,
): StillingsDataInfo => {
  const stillingStatus = stillingsData.stilling.status as StillingsStatus;

  return {
    erUtløpt: stillingErUtløpt(stillingsData.stilling),
    erFormidling:
      stillingsData?.stillingsinfo?.stillingskategori ===
      Stillingskategori.Formidling,
    erPublisert: stillingStatus === StillingsStatus.Aktiv,
    erUtkast: !stillingsData.stilling.publishedByAdmin,
    erSlettet: stillingStatus === StillingsStatus.Slettet,
    erStoppet: stillingStatus === StillingsStatus.Stoppet,
    erJobbMesse:
      stillingsData?.stillingsinfo?.stillingskategori ===
      Stillingskategori.Jobbmesse,
    erPåArbeidsplassen: stillingsData?.stilling?.privacy === 'SHOW_ALL',
    erDirektemeldt: stillingsData?.stilling?.source === 'DIR',
  };
};
