import { KandidatAPI } from '../api-routes';
import { putApi } from '../fetcher';

export const endreKandidatStatus = (
  kandidatlisteId: string,
  kandidatnr: string,
  status: string,
) => {
  putApi(
    `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/status`,
    JSON.stringify({ status }),
  );
};
