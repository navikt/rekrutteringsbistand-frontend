import { forespørselOmDelingAvCVStatistikkMock } from '@/app/api/foresporsel-om-deling-av-cv/mocks/forespørselStatistikkMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const foresporselOmDelingAvCVStatistikkMSWHandler = getMock(
  '/api/foresporsel-om-deling-av-cv/statistikk',
  () => HttpResponse.json(forespørselOmDelingAvCVStatistikkMock),
);
