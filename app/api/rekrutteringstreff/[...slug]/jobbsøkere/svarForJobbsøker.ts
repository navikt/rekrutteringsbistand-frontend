import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { postMock } from '@/mocks/mockUtils';
import { logger } from '@navikt/next-logger';
import { HttpResponse } from 'msw';

const rekrutteringstreffSvarForJobbsøkerEndepunkt = (
  rekrutteringstreffId: string,
  personsTreffId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/${personsTreffId}/svar`;

export const svarForJobbsøker = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  svar: boolean | null,
): Promise<void> => {
  try {
    await postApi(
      rekrutteringstreffSvarForJobbsøkerEndepunkt(
        rekrutteringstreffId,
        personTreffId,
      ),
      {
        personTreffId: personTreffId,
        svar: svar,
      },
    );
  } catch (error) {
    logger.error(
      error,
      `Feil ved svar på vegne av jobbsøker ${personTreffId} til rekrutteringstreff ${rekrutteringstreffId}`,
    );
    throw error;
  }
};

export const svarForJobbsøkerMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/:personsTreffId/svar`,
  () => HttpResponse.json({}),
);
