import { logger } from '@navikt/next-logger';
import { KandidatAPI } from '../../api-routes';
import { FormidlingUsynligKandidatDTO } from '../../kandidat/formidleKandidat';
import { hentOboToken } from '../../oboToken';

interface leggTilKandidaterPåEtterregistreringProps {
  kandidater: FormidlingUsynligKandidatDTO[];
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

export const leggTilKandidaterPåEtterregistrering = async ({
  kandidater,
  kandidatlisteId,
  reqHeaders,
}: leggTilKandidaterPåEtterregistreringProps): Promise<Result> => {
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

    try {
      await Promise.all(
        kandidater.map(async (kandidat) => {
          const response = await fetch(
            `${KandidatAPI.api_url}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`,
            {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(kandidat),
            },
          );

          if (!response.ok) {
            throw new Error(
              `Failed to add candidate: ${await response.text()}`,
            );
          }

          return response;
        }),
      );

      return {
        success: true,
      };
    } catch (error) {
      logger.error('Klarte ikke å formidle kandidater ', error);
      return {
        success: false,
        error: 'Klarte ikke å formidle kandidater',
      };
    }
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
