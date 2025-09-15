import { KandidatAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';

export const leggTilKandidatEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste/kandidater`;

export const leggTilKandidater = async (
  kandidater: string[],
  stillingsId: string,
): Promise<Response> => {
  const kandidaterArray = kandidater.map((kandidatnr) => ({ kandidatnr }));
  return await postApi(leggTilKandidatEndepunkt(stillingsId), kandidaterArray);
};
