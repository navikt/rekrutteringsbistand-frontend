import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

export const endreKandidatStatus = async (
  kandidatlisteId: string,
  kandidatnr: string,
  status: string,
) => {
  await putApi(
    `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/status`,
    { status },
  );
};
