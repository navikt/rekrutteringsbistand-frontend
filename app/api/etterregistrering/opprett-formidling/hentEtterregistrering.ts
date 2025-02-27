import { logger } from '@navikt/next-logger';
import { StillingAPI } from '../../api-routes';
import { hentOboToken, setHeaderToken } from '../../oboToken';
import { StillingsDataDTO } from '../../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

interface hentEtterregistreringProps {
  stillingsId: string;
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

export const hentEtterregistrering = async ({
  stillingsId,
  reqHeaders,
}: hentEtterregistreringProps): Promise<Result> => {
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
      `${StillingAPI.api_url}/rekrutteringsbistandstilling/${stillingsId}`,
      {
        method: 'GET',
        headers: nyeHeaders,
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error:
          '[Opprett etterregistrering] Feil respons ved henting av etterregistrering',
      };
    }

    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    logger.error(
      '[Opprett etterregistrering] Feil ved henting av etterregistrering:',
      error,
    );
    return {
      success: false,
      error:
        '[Opprett etterregistrering] Feil ved henting av etterregistrering',
    };
  }
};
