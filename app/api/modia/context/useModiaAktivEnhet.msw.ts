import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const modiaAktivEnhetEndepunkt = `${ModiaDecoratorAPI.internUrl}/context/v2/aktivenhet`;

export const modiaAktivEnhetMSWHandler = getMock(modiaAktivEnhetEndepunkt, () =>
  HttpResponse.json({ aktivEnhet: '1337' }),
);
