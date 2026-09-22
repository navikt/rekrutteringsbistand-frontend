import { BrukerAPI } from '@/app/api/api-routes';
import { getMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const brukerinnstillingerEndepunkt = `${BrukerAPI.internUrl}/innstillinger`;

let brukerinnstillinger = {
  antallLesteNyheter: 0,
  darkMode: false,
  windowMode: false,
  tekststørrelse: 'standard',
};

export const brukerinnstillingerMSWHandlers = [
  getMock(brukerinnstillingerEndepunkt, () =>
    HttpResponse.json(brukerinnstillinger),
  ),
  putMock(brukerinnstillingerEndepunkt, async ({ request }) => {
    brukerinnstillinger = (await request.json()) as typeof brukerinnstillinger;
    return HttpResponse.json(brukerinnstillinger);
  }),
];
