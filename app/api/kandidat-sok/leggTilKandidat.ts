import { KandidatAPI } from '../api-routes';
import { postApi } from '../fetcher';

const leggTilKandidatEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste/kandidater`;

export const leggTilKandidater = (
  kandidater: { kandidatnr: string }[],
  stillingsId: string,
): Promise<void> => {
  return postApi(leggTilKandidatEndepunkt(stillingsId), kandidater);
};
