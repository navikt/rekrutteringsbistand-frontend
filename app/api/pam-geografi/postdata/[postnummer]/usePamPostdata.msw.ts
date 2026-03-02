import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const pamPostdataMSWHandler = getMock(
  '/api/pam-geografi/postdata/:postnummer',
  ({ params }) =>
    HttpResponse.json({
      postkode: (params.postnummer as string) || '1234',
      by: 'KRISTIANSAND S',
      kommune: {
        kommunenummer: '4204',
        navn: 'KRISTIANSAND',
        fylkesnummer: '42',
        korrigertNavn: 'Kristiansand',
      },
      fylke: {
        fylkesnummer: '42',
        navn: 'AGDER',
        korrigertNavn: 'Agder',
      },
      korrigertNavnBy: 'Kristiansand S',
    }),
);
