import { logger } from '@navikt/next-logger';
import { KandidatAPI } from '../../api-routes';
import { FormidlingUsynligKandidatDTO } from '../../kandidat/formidleKandidat';
import { hentOboToken } from '../../oboToken';

interface leggTilKandidaterPåEtterregistreringProps {
  kandidater: FormidlingUsynligKandidatDTO[];
  kandidatlisteId: string;
  reqHeaders: Headers;
  stillingsId: string;
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
      for (const kandidat of kandidater) {
        try {
          const response = await fetch(
            `${KandidatAPI.api_url}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`,
            {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(kandidat),
              signal: AbortSignal.timeout(15000), // 15 seconds timeout
            },
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Klarte ikke å legge til kandidat (${response.status}): ${errorText}`,
            );
          }

          await new Promise((resolve) => setTimeout(resolve, 500));

          // Refresh candidate list info to avoid concurrent modification errors
          // await hentKandidatlisteInfo({
          //   stillingsId,
          //   reqHeaders,
          // });
        } catch (fetchError) {
          logger.error(
            `Feil ved formidling av kandidat...: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`,
          );

          return {
            success: false,
            error: `Klarte ikke å formidle alle kandidater.`,
          };
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      logger.error(`Klarte ikke å formidle kandidater: ${errorMessage}`, error);
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
