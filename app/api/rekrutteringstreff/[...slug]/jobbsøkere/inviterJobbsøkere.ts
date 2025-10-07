import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const rekrutteringstreffInviterJobbsøkereEndepunkt = (
  rekrutteringstreffId: string,
) => `/api/rekrutteringstreff/${rekrutteringstreffId}/jobbsoker/inviter`;

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

export const inviterJobbsøkereMirage = (server: any) => {
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/jobbsoker/inviter',
    () => {
      return {};
    },
  );
};
