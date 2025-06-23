// filepath: app/api/rekrutteringstreff/inviter-jobbsoker/inviterJobbsøker.ts
import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const inviterJobbsøkerEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/jobbsoker/inviter`;

export const inviterJobbsøker = async (
  rekrutteringstreffId: string,
  jobbsokerId: string,
): Promise<void> => {
  try {
    await postApi(inviterJobbsøkerEndepunkt(rekrutteringstreffId), {});
  } catch (error) {
    logger.error(
      `Feil ved invitasjon av jobbsøker ${jobbsokerId} til rekrutteringstreff ${rekrutteringstreffId}`,
      error,
    );
    throw error;
  }
};

export const inviterJobbsøkerMirage = (server: any) => {
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/jobbsoker/:jobbsokerId/inviter',
    () => {
      return {};
    },
  );
};
