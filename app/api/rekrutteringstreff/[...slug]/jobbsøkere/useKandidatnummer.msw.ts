import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const kandidatnummerMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/:personTreffId/kandidatnummer`,
  () => HttpResponse.json({ kandidatnummer: 'PAM0123ABCDE' }),
);
