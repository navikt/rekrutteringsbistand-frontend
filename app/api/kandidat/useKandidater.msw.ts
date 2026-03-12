import { KandidatAPI } from '@/app/api/api-routes';
import { mockKandidatliste } from '@/app/api/kandidat/mocks/kandidatliste.mock';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const kandidaterMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidater`,
  ({ request }) => {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const stillingsId = segments[segments.indexOf('kandidater') - 1];

    const side = Number(url.searchParams.get('side') ?? '1');
    const antall = Number(url.searchParams.get('antall') ?? '25');

    let kandidater = mockKandidatliste.kandidater;

    if (stillingsId === 'fullfortBesattLast') {
      kandidater = kandidater.map((k, i) =>
        i === 0
          ? { ...k, utfall: KandidatutfallTyper.FATT_JOBBEN, arkivert: false }
          : { ...k, utfall: KandidatutfallTyper.IKKE_PRESENTERT },
      );
    }

    if (
      stillingsId === 'fullfortIkkeBesattIkkeLast' ||
      stillingsId === 'fullfortIkkeBesattLast'
    ) {
      kandidater = kandidater.map((k) => ({
        ...k,
        utfall: KandidatutfallTyper.IKKE_PRESENTERT,
      }));
    }

    const start = (side - 1) * antall;
    const paginert = kandidater.slice(start, start + antall);

    return HttpResponse.json({
      kandidater: paginert,
      formidlingerAvUsynligKandidat:
        mockKandidatliste.formidlingerAvUsynligKandidat,
    });
  },
);
