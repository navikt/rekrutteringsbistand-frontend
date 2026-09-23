import { BrukerAPI } from '@/app/api/api-routes';
import { nyheterMock } from '@/app/api/bruker/nyheter/nyheter.mock';
import { getMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const brukerinnstillingerEndepunkt = `${BrukerAPI.internUrl}/innstillinger`;

// Mock-serveren deles av alle parallelle tester, så innstillinger lagres ikke
const standardInnstillinger = {
  antallLesteNyheter: nyheterMock.length,
  darkMode: false,
  windowMode: false,
  tekststørrelse: 'standard',
};

export const brukerinnstillingerMSWHandlers = [
  getMock(brukerinnstillingerEndepunkt, () =>
    HttpResponse.json(standardInnstillinger),
  ),
  putMock(brukerinnstillingerEndepunkt, async ({ request }) =>
    HttpResponse.json(await request.json()),
  ),
];
