import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

export const endreKandidatStatus = (
  kandidatlisteId: string,
  kandidatnr: string,
  status: string,
) => {
  putApi(
    `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/status`,
    { status },
  );
};
