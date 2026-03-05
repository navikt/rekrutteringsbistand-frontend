import { StatistikkAPI } from '@/app/api/api-routes';
import { statistikkMock } from '@/app/api/statistikk/mocks/statistikkMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const statistikkMSWHandler = getMock(`${StatistikkAPI.internUrl}`, () =>
  HttpResponse.json(statistikkMock),
);
