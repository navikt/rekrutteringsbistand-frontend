import { KandidatAPI } from '../api-routes';
import { putApi } from '../fetcher';

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
  } catch (error) {
    throw error;
  }
};
