import { KandidatAPI } from '@/app/api/api-routes';
import { kandidatlisteoversiktMock } from '@/app/api/kandidat/mocks/kandidatlisteoversiktMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const kandidatlisteoversiktMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/kandidater/*/listeoversikt`,
  () => HttpResponse.json(kandidatlisteoversiktMock),
);
