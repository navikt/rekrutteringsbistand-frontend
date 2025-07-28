import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const inviterJobbsøkereEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/jobbsoker/inviter`;

export const inviterJobbsøkere = async (
  rekrutteringstreffId: string,
  personTreffIder: string[],
): Promise<void> => {
  try {
    await postApi(inviterJobbsøkereEndepunkt(rekrutteringstreffId), {
      personTreffIder,
    });
  } catch (error) {
    logger.error(
      `Feil ved invitasjon av ${personTreffIder.length} jobbsøkere til rekrutteringstreff ${rekrutteringstreffId}`,
      error,
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
