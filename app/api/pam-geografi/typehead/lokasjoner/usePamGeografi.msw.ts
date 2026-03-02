import lokasjonerMock from '@/app/api/pam-geografi/typehead/lokasjoner/lokasjoner.mock.json';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const pamGeografiEndepunkt = '/api/pam-geografi/typehead/lokasjoner';

export const pamGeografiMSWHandler = getMock(pamGeografiEndepunkt, () =>
  HttpResponse.json(lokasjonerMock),
);
