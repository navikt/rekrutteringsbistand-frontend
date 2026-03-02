import { KandidatAPI } from '@/app/api/api-routes';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const formidleUsynligKandidatEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`;

export const formidleUsynligKandidatMSWHandler = postMock(
  formidleUsynligKandidatEndepunkt(':kandidatlisteId'),
  () => HttpResponse.json({ message: 'Kandidaten er formidlet' }),
);
