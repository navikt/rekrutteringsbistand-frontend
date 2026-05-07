import { KandidatAPI } from '@/app/api/api-routes';
import { mockJobbSøkere } from '@/app/api/kandidat/useKandidlisteKandidater.msw';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const kandidatIListeMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidater/:kandidatnr`,
  ({ params }) => {
    const kandidatnr = params.kandidatnr as string;
    const person = mockJobbSøkere.find(
      (p) => p.kandidat?.kandidatnr === kandidatnr,
    );

    if (!person) {
      return HttpResponse.json(
        { feilmelding: 'Fant ikke kandidat' },
        { status: 404 },
      );
    }

    return HttpResponse.json(person);
  },
);
