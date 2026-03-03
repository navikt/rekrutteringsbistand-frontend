import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const kontorSøkEndepunkt = `${KandidatSøkAPI.internUrl}/suggest/kontor`;

export const kontorSøkMSWHandler = postMock(kontorSøkEndepunkt, async () =>
  HttpResponse.json([
    'Nasjonal oppfølgingsenhet',
    'NAV Kristiansand',
    'NAV Fredrikstad',
    'NAV Drammen',
    'NAV Lillestrøm',
    'NAV Falkenborg',
    'NAV Sarpsborg',
    'NAV Lerkendal',
    'NAV Grünerløkka',
    'NAV Bærum',
  ]),
);
