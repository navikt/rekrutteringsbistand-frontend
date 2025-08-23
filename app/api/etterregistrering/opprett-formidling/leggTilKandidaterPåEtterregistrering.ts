import { KandidatAPI } from '@/app/api/api-routes';
import { FormidlingUsynligKandidatDTO } from '@/app/api/kandidat/formidleKandidat';
import { hentOboToken } from '@/app/api/oboToken';
import { RekbisError } from '@/util/rekbisError';

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
            throw new RekbisError({
              message: `Klarte ikke å legge til kandidat (${response.status}): ${errorText}`,
            });
          }

          // await new Promise((resolve) => setTimeout(resolve, 500));

          // Refresh candidate list info to avoid concurrent modification errors
          // await hentKandidatlisteInfo({
          //   stillingsId,
          //   reqHeaders,
          // });
        } catch (fetchError) {
          new RekbisError({
            message: `Feil ved formidling av kandidat.`,
            error: fetchError,
          });

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
      new RekbisError({
        message: `Klarte ikke å formidle kandidater: ${errorMessage}`,
        error,
      });
      return {
        success: false,
        error: 'Klarte ikke å formidle kandidater',
      };
    }
  } catch (error) {
    new RekbisError({
      message:
        '[Opprett etterregistrering] Feil ved oppdatering av etterregistrering:',
      error,
    });
    return {
      success: false,
      error: 'Feil ved oppdatering av etterregistrering',
    };
  }
};
