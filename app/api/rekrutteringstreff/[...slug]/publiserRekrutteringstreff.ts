import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const publiserRekrutteringstreffEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/publiser`;

export const publiserRekrutteringstreff = async (
  rekrutteringstreffId: string,
): Promise<void> => {
  try {
    await postApi(
      publiserRekrutteringstreffEndepunkt(rekrutteringstreffId),
      {},
    );
  } catch (error) {
    logger.error(
      `Feil ved publisering av rekrutteringstreff med id ${rekrutteringstreffId}`,
      error,
    );
    throw error;
  }
};
export const publiserRekrutteringstreffMirage = (server: any) => {
  server.post('/api/rekrutteringstreff/:rekrutteringstreffId/publiser', () => {
    return {};
  });
};
