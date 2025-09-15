import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';
import { RekbisError } from '@/util/rekbisError';

const kandidatlisteStatusEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/status`;

export const setKandidatlisteStatus = async (
  kandidatlisteId: string,
  status: string,
) => {
  try {
    const response = await putApi(
      kandidatlisteStatusEndepunkt(kandidatlisteId),
      { status },
    );
    return response.data;
  } catch {
    throw new RekbisError({
      message: 'Klarte ikke å sette kandidatliste status',
    });
  }
};
