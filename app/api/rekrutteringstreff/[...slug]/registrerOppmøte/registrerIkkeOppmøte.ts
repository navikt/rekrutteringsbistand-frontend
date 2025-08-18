import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const ikkeOppmøteJobbsøkereEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/jobbsoker/registrer-ikke-oppmote`;

export const registrerIkkeOppmøte = async (
  rekrutteringstreffId: string,
  personTreffIder: string[],
): Promise<void> => {
  try {
    await postApi(ikkeOppmøteJobbsøkereEndepunkt(rekrutteringstreffId), {
      personTreffIder,
    });
  } catch (error) {
    logger.error(
      error,
      `Feil ved registrering av ikke oppmøte for ${personTreffIder.length} jobbsøkere til rekrutteringstreff ${rekrutteringstreffId}`,
    );
    throw error;
  }
};

export const registrerIkkeOppmøteMirage = (server: any) => {
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/jobbsoker/registrer-ikke-oppmote',
    () => {
      return {};
    },
  );
};
