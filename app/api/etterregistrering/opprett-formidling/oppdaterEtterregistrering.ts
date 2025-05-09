import { StillingAPI } from '../../api-routes';
import { hentOboToken } from '../../oboToken';
import { StillingsDataDTO } from '../../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { logger } from '@navikt/next-logger';

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

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${obo.token}`,
    });
    const response = await fetch(
      `${StillingAPI.api_url}/rekrutteringsbistandstilling`,
      {
        method: 'PUT',
        headers: headers,
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
    const data = await response.json();
    return {
      success: true,
      data,
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
