import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';
import { settAktuellForTreffStatus } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mocks/jobbsøkereMockBackend';
import { AktuellForTreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { putMock } from '@/mocks/mockUtils';
import { logger } from '@navikt/next-logger';
import { HttpResponse } from 'msw';

const endepunkt = (rekrutteringstreffId: string, personTreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/${personTreffId}/aktuell-for-treff-status`;

export const endreAktuellForTreffStatus = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  aktuellForTreffStatus: AktuellForTreffStatus,
): Promise<void> => {
  try {
    await putApi(endepunkt(rekrutteringstreffId, personTreffId), {
      aktuellForTreffStatus,
    });
  } catch (error) {
    logger.error(
      error,
      `Feil ved endring av aktuellForTreffStatus for ${personTreffId} i treff ${rekrutteringstreffId}`,
    );
    throw error;
  }
};

export const endreAktuellForTreffStatusMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/:personTreffId/aktuell-for-treff-status`,
  async ({ params, request }) => {
    const body = ((await request.json().catch(() => ({}))) ?? {}) as {
      aktuellForTreffStatus?: string | null;
    };

    const statusErOppdatert = settAktuellForTreffStatus(
      request,
      params.rekrutteringstreffId as string,
      params.personTreffId as string,
      body.aktuellForTreffStatus ?? null,
    );

    return statusErOppdatert
      ? HttpResponse.json({})
      : HttpResponse.json(
          { feil: 'Jobbsøkeren finnes ikke på treffet.' },
          { status: 404 },
        );
  },
);
