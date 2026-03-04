import { KandidatSøkAPI } from '@/app/api/api-routes';
import {
  mapToKandidatSokKandidat,
  mockKandidatDataList,
} from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { KandidatSøkPortefølje } from '@/app/kandidat/KandidaSokFilterContext';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

type KandidatsokKandidat = NonNullable<
  ReturnType<typeof mapToKandidatSokKandidat>
>;

const kandidatSokEndepunkt = (type: KandidatSøkPortefølje | '*') =>
  `${KandidatSøkAPI.internUrl}/kandidatsok/${type}`;

export const kandidatSokMSWHandler = postMock(
  kandidatSokEndepunkt('*'),
  async () => {
    const mappedKandidater = mockKandidatDataList
      .map(mapToKandidatSokKandidat)
      .filter((k): k is KandidatsokKandidat => k !== null);
    const kandidatnumreForNavigering = mappedKandidater
      .map((k) => k.arenaKandidatnr)
      .filter((n): n is string => typeof n === 'string');
    return HttpResponse.json({
      kandidater: mappedKandidater,
      navigering: { kandidatnumre: kandidatnumreForNavigering },
      antallTotalt: mappedKandidater.length,
    });
  },
);
