import { KandidatAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const kandidatnrIListeMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidatnr`,
  () =>
    HttpResponse.json({
      kandidatnr: Array.from({ length: 300 }, (_, i) => String(i + 1)),
    }),
);
