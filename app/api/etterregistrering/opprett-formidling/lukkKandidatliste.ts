import { RekbisError } from '../../../../util/rekbisError';
import { KandidatAPI } from '../../api-routes';
import { hentOboToken } from '../../oboToken';

interface lukkKandidatlisteProps {
  kandidatlisteId: string;
  reqHeaders: Headers;
}

interface Success {
  success: true;
}

interface Failure {
  success: false;
  error: string;
}

type Result = Success | Failure;

export const lukkKandidatliste = async ({
  kandidatlisteId,
  reqHeaders,
}: lukkKandidatlisteProps): Promise<Result> => {
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
      `${KandidatAPI.api_url}/veileder/kandidatlister/${kandidatlisteId}/status`,
      {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ status: 'LUKKET' }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error:
          '[Opprett etterregistrering] Feil respons ved setting av status på kandidatliste',
      };
    }
    return {
      success: true,
    };
  } catch (e) {
    new RekbisError({
      message:
        '[Opprett etterregistrering] Feil respons ved setting av status på kandidatliste',
      error: e,
    });
    return {
      success: false,
      error:
        '[Opprett etterregistrering] Feil ved setting av status på kandidatliste',
    };
  }
};
