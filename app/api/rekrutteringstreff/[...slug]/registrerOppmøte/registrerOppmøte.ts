import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const oppmøteJobbsøkereEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/jobbsoker/registrer-oppmote`;

export const registrerOppmøte = async (
  rekrutteringstreffId: string,
  personTreffIder: string[],
): Promise<void> => {
  try {
    await postApi(oppmøteJobbsøkereEndepunkt(rekrutteringstreffId), {
      personTreffIder,
    });
  } catch (error) {
    logger.error(
      error,
      `Feil ved registrering av oppmøte for ${personTreffIder.length} jobbsøkere til rekrutteringstreff ${rekrutteringstreffId}`,
    );
    throw error;
  }
};

export const registrerOppmøteMirage = (server: any) => {
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/jobbsoker/registrer-oppmote',
    () => {
      return {};
    },
  );
};
