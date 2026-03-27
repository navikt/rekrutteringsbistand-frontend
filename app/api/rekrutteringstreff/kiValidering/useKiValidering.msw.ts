import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { kiLoggMock } from '@/app/api/rekrutteringstreff/kiValidering/kiLoggMock';
import { validerRekrutteringstreffMock } from '@/app/api/rekrutteringstreff/kiValidering/validerRekrutteringstreffMock';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const listKiLoggMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/ki/logg`,
  () => HttpResponse.json(kiLoggMock),
);

export const oppdaterKiLoggManuellMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/ki/logg/:id/manuell`,
  () => new HttpResponse(null, { status: 204 }),
);

export const oppdaterKiLoggLagretMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/ki/logg/:id/lagret`,
  () => new HttpResponse(null, { status: 204 }),
);

export const validerRekrutteringstreffMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/ki/valider`,
  () => HttpResponse.json(validerRekrutteringstreffMock()),
);
