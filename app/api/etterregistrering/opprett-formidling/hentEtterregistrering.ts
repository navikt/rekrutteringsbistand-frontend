import { StillingAPI } from '@/app/api/api-routes';
import { hentOboToken } from '@/app/api/oboToken';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekbisError } from '@/util/rekbisError';

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

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${obo.token}`,
    });
    const response = await fetch(
      `${StillingAPI.api_url}/rekrutteringsbistandstilling/${stillingsId}`,
      {
        method: 'GET',
        headers: headers,
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
    new RekbisError({
      message:
        '[Opprett etterregistrering] Feil ved henting av etterregistrering:',
      error,
    });
    return {
      success: false,
      error:
        '[Opprett etterregistrering] Feil ved henting av etterregistrering',
    };
  }
};
