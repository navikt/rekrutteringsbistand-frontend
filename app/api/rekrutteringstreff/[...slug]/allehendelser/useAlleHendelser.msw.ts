import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { alleHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/alleHendelserMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const alleHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/allehendelser`,
  () => HttpResponse.json(alleHendelserMock()),
);
