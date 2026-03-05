import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const modiaAktivBrukerEndepunkt = `${ModiaDecoratorAPI.internUrl}/context/v2/aktivbruker`;

export const modiaAktivBrukerMSWHandler = getMock(
  modiaAktivBrukerEndepunkt,
  () => HttpResponse.json({ aktivBruker: '16828397901' }),
);
