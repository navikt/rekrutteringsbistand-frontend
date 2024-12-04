import { KandidatAPI } from '../api-routes';
import { postApi } from '../fetcher';

const leggTilKandidatEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste/kandidater`;

export const leggTilKandidater = (
  kandidater: string[],
  stillingsId: string,
): Promise<void> => {
  const kandidaterArray = kandidater.map((kandidatnr) => ({ kandidatnr }));
  return postApi(leggTilKandidatEndepunkt(stillingsId), kandidaterArray);
};
