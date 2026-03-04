import { brukerMock } from '@/app/api/bruker/mocks/useBrukerMock';
import { Roller } from '@/components/tilgangskontroll/roller';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const brukerEndepunkt = '/api/bruker';

export const brukerMSWHandler = getMock(brukerEndepunkt, ({ cookies }) => {
  const rolle =
    cookies['DEV-ROLLE'] || Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER;

  const bruker = cookies['DEV-BRUKER'] || 'TestIdent';

  return HttpResponse.json({
    ...brukerMock,
    roller: [rolle as Roller],
    navIdent: bruker,
  });
});
