import { logger } from '@navikt/next-logger';
import { KandidatAPI } from '../../api-routes';
import { KandidatlisteInfoDTO } from '../../kandidat/useKandidatlisteInfo';
import { hentOboToken, setHeaderToken } from '../../oboToken';

interface hentKandidatlisteInfoProps {
  stillingsId: string;
  reqHeaders: Headers;
}

interface Success {
  success: true;
  data: KandidatlisteInfoDTO;
}

interface Failure {
  success: false;
  error: string;
}

type Result = Success | Failure;

export const hentKandidatlisteInfo = async ({
  stillingsId,
  reqHeaders,
}: hentKandidatlisteInfoProps): Promise<Result> => {
  try {
    const obo = await hentOboToken({
      headers: reqHeaders,
      scope: KandidatAPI.scope,
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
      `${KandidatAPI.api_url}/veileder/stilling/${stillingsId}/kandidatlisteinfo`,
      {
        method: 'GET',
        headers: nyeHeaders,
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error:
          '[Opprett etterregistrering] Feil respons ved henting av kandidatlisteinfo',
      };
    }

    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    logger.error(
      '[Opprett etterregistrering] Feil ved henting av kandidatlisteinfo:',
      error,
    );
    return {
      success: false,
      error:
        '[Opprett etterregistrering] Feil ved henting av kandidatlisteinfo',
    };
  }
};
