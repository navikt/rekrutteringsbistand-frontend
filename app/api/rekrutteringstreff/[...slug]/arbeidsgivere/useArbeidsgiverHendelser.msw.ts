import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { arbeidsgiverHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgiverHendelserMock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const arbeidsgiverHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/hendelser`,
  () => HttpResponse.json(arbeidsgiverHendelserMock()),
);
