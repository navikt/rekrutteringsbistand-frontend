import { KandidatAPI } from '@/app/api/api-routes';
import { mockKandidatliste } from '@/app/api/kandidat/mocks/kandidatliste.mock';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const kandidatlisteMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidatliste`,
  ({ request }) => {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const stillingsId = segments[segments.length - 2];

    if (stillingsId === 'fullfortBesattLast') {
      return HttpResponse.json({
        ...mockKandidatliste,
        kandidater: mockKandidatliste.kandidater.map((k, i) =>
          i === 0
            ? { ...k, utfall: KandidatutfallTyper.FATT_JOBBEN, arkivert: false }
            : { ...k, utfall: KandidatutfallTyper.IKKE_PRESENTERT },
        ),
      });
    }

    if (
      stillingsId === 'fullfortIkkeBesattIkkeLast' ||
      stillingsId === 'fullfortIkkeBesattLast'
    ) {
      return HttpResponse.json({
        ...mockKandidatliste,
        kandidater: mockKandidatliste.kandidater.map((k) => ({
          ...k,
          utfall: KandidatutfallTyper.IKKE_PRESENTERT,
        })),
        formidlingerAvUsynligKandidat:
          mockKandidatliste.formidlingerAvUsynligKandidat.map((k) => ({
            ...k,
            utfall: KandidatutfallTyper.IKKE_PRESENTERT,
          })),
      });
    }

    return HttpResponse.json(mockKandidatliste);
  },
);
