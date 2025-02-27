import { logger } from '@navikt/next-logger';
import { StillingAPI } from '../../api-routes';
import { hentOboToken, setHeaderToken } from '../../oboToken';
import { StillingsDataDTO } from '../../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

interface oppdaterEtterregistreringProps {
  nyData: StillingsDataDTO;
  reqHeaders: Headers;
}

interface Success {
  success: true;
  data: StillingsDataDTO;
}

interface Failure {
  success: false;
  error: string;
}

type Result = Success | Failure;

export const oppdaterEtterregistrering = async ({
  nyData,
  reqHeaders,
}: oppdaterEtterregistreringProps): Promise<Result> => {
  try {
    const obo = await hentOboToken({
      headers: reqHeaders,
      scope: StillingAPI.scope,
    });

    if (!obo.ok) {
      return {
        success: false,
        error: 'Kunne ikke hente OBO-token',
      };
    }

    const nyeHeaders = setHeaderToken({
      headers: reqHeaders,
      oboToken: obo.token,
    });
    const response = await fetch(
      `${StillingAPI.api_url}/rekrutteringsbistandstilling/oppdater-stilling`,
      {
        method: 'PUT',
        headers: nyeHeaders,
        body: JSON.stringify(nyData),
      },
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        error: errorResponse.error,
      };
    }

    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    logger.error(
      '[Opprett etterregistrering] Feil ved oppdatering av etterregistrering:',
      error,
    );
    return {
      success: false,
      error: 'Feil ved oppdatering av etterregistrering',
    };
  }
};
