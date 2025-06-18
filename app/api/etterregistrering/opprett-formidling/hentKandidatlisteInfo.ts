import { RekbisError } from '../../../../util/rekbisError';
import { KandidatAPI } from '../../api-routes';
import { KandidatlisteInfoDTO } from '../../kandidat/useKandidatlisteInfo';
import { hentOboToken } from '../../oboToken';

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

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${obo.token}`,
    });
    const response = await fetch(
      `${KandidatAPI.api_url}/veileder/stilling/${stillingsId}/kandidatlisteinfo`,
      {
        method: 'GET',
        headers: headers,
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error:
          '[Opprett etterregistrering] Feil respons ved henting av kandidatlisteinfo',
      };
    }
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    new RekbisError({
      beskrivelse:
        '[Opprett etterregistrering] Feil ved henting av kandidatlisteinfo:',
      error,
    });
    return {
      success: false,
      error:
        '[Opprett etterregistrering] Feil ved henting av kandidatlisteinfo',
    };
  }
};
