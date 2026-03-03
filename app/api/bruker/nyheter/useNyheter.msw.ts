import { BrukerAPI } from '@/app/api/api-routes';
import { nyheterMock } from '@/app/api/bruker/nyheter/nyheter.mock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const hentNyheterEndepunkt = `${BrukerAPI.internUrl}/nyheter`;

export const nyheterMSWHandler = getMock(hentNyheterEndepunkt, () =>
  HttpResponse.json(nyheterMock),
);
