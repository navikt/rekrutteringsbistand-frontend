import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

const endreUtfallUsynligKandidatEndepunkt = (
  kandidatlisteId: string,
  formidlingsId: string,
) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat/${formidlingsId}/utfall`;

const endreUtfallKandidatEndepunkt = (
  kandidatlisteId: string,
  kandidatnr: string,
) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/utfall`;

export const endreUtfallForUsynligKandidat = async (
  kandidatlisteId: string,
  formidlingId: string,
  utfall: 'IKKE_PRESENTERT' | 'PRESENTERT' | 'FATT_JOBBEN',
  navKontor: string,
) =>
  await putApi(
    endreUtfallUsynligKandidatEndepunkt(kandidatlisteId, formidlingId),
    {
      body: JSON.stringify({ utfall, navKontor }),
    },
  );

export const endreUtfallKandidat = async (
  utfall: 'IKKE_PRESENTERT' | 'PRESENTERT' | 'FATT_JOBBEN',
  navKontor: string,
  kandidatlisteId: string,
  kandidatnr: string,
) =>
  await putApi(endreUtfallKandidatEndepunkt(kandidatlisteId, kandidatnr), {
    utfall,
    navKontor,
  });
