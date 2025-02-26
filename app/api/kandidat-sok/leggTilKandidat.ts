import { KandidatAPI } from '../api-routes';
import { postApi } from '../fetcher';

export const leggTilKandidatEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste/kandidater`;

export const leggTilKandidater = async (
  kandidater: string[],
  stillingsId: string,
): Promise<Response> => {
  const kandidaterArray = kandidater.map((kandidatnr) => ({ kandidatnr }));
  return await postApi(leggTilKandidatEndepunkt(stillingsId), kandidaterArray);
};
