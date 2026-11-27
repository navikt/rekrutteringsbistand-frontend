import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';
import { putMock } from '@/mocks/mockUtils';
import { RekbisError } from '@/util/rekbisError';
import { HttpResponse } from 'msw';

const kandidatlisteStatusEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/status`;

export const setKandidatlisteStatus = async (
  kandidatlisteId: string,
  status: string,
) => {
  try {
    await putApi(kandidatlisteStatusEndepunkt(kandidatlisteId), { status });
  } catch {
    throw new RekbisError({
      message: 'Klarte ikke å sette kandidatliste status',
    });
  }
};

export const setKandidatlisteStatusMSWHandler = putMock(
  `${KandidatAPI.internUrl}/veileder/kandidatlister/*/status`,
  () => HttpResponse.json({ status: 'ok' }),
);
