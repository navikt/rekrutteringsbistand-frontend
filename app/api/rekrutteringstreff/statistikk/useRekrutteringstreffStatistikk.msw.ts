import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { rekrutteringstreffStatistikkMock } from '@/app/api/rekrutteringstreff/statistikk/mocks/rekrutteringstreffStatistikkMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const rekrutteringstreffStatistikkMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/statistikk/fatt-jobben`,
  () => HttpResponse.json(rekrutteringstreffStatistikkMock),
);
