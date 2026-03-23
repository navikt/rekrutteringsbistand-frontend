import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { jobbsøkerHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkerHendelserMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const jobbsøkerHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/hendelser`,
  () => HttpResponse.json(jobbsøkerHendelserMock()),
);
