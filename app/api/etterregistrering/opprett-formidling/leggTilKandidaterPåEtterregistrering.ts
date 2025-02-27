import { logger } from '@navikt/next-logger';
import { KandidatAPI, StillingAPI } from '../../api-routes';
import { FormidlingUsynligKandidatDTO } from '../../kandidat/formidleKandidat';
import { hentOboToken, setHeaderToken } from '../../oboToken';

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

    try {
      kandidater.forEach(async (kandidat) => {
        await fetch(
          `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`,
          {
            method: 'POST',
            headers: nyeHeaders,
            body: JSON.stringify(kandidat),
          },
        );
      });

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
