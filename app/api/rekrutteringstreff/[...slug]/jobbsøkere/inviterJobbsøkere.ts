import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';
import { http, HttpResponse } from 'msw';

const rekrutteringstreffInviterJobbsøkereEndepunkt = (
  rekrutteringstreffId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/inviter`;

export const inviterJobbsøkere = async (
  rekrutteringstreffId: string,
  personTreffIder: string[],
): Promise<void> => {
  try {
    await postApi(
      rekrutteringstreffInviterJobbsøkereEndepunkt(rekrutteringstreffId),
      {
        personTreffIder,
      },
    );
  } catch (error) {
    logger.error(
      error,
      `Feil ved invitasjon av ${personTreffIder.length} jobbsøkere til rekrutteringstreff ${rekrutteringstreffId}`,
    );
    throw error;
  }
};

export const inviterJobbsøkereMSWHandler = http.post(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/inviter`,
  () => HttpResponse.json({}),
);
