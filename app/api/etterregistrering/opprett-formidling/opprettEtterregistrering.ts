import { logger } from '@navikt/next-logger';
import { StillingAPI } from '../../api-routes';
import { hentOboToken, setHeaderToken } from '../../oboToken';
import { OpprettNyStillingDTO } from '../../stilling/ny-stilling/dto';
import { StillingsDataDTO } from '../../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

interface opprettEtterregistreringProps {
  nyEtterregistreringDTO: OpprettNyStillingDTO;
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

export const opprettEtterregistrering = async ({
  nyEtterregistreringDTO,
  reqHeaders,
}: opprettEtterregistreringProps): Promise<Result> => {
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
      `${StillingAPI.api_url}/rekrutteringsbistandstilling/ny-stilling`,
      {
        method: 'POST',
        headers: nyeHeaders,
        body: JSON.stringify(nyEtterregistreringDTO),
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
      '[Opprett etterregistrering] Feil ved oppretting av etterregistrering:',
      error,
    );
    return {
      success: false,
      error: 'Feil ved oppretting av etterregistrering',
    };
  }
};
