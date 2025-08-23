import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

export const slettCvFraArbeidsgiversKandidatliste = async (
  kandidatlisteId: string,
  kandidatnummer: string,
  navKontor: string | null,
) => {
  return await putApi(
    `${KandidatAPI.internUrl}/veileder/kandidat/arbeidsgiverliste/${kandidatlisteId}/${kandidatnummer}`,
    { navKontor: navKontor },
  );
};
