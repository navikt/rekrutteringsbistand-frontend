import { KandidatAPI } from '../api-routes';
import { putApi } from '../fetcher';

export const slettCvFraArbeidsgiversKandidatliste = async (
  kandidatlisteId: string,
  kandidatnummer: string,
  navKontor: string | null,
) => {
  return await putApi(
    `${KandidatAPI.internUrl}/veileder/kandidat/arbeidsgiverliste/${kandidatlisteId}/${kandidatnummer}`,
    navKontor,
  );
};
