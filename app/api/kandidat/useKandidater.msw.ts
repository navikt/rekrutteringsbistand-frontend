import { KandidatAPI } from '@/app/api/api-routes';
import { getSingleKandidatDataSchema } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { mapKandidatDataToKandidatListeKandidat } from '@/app/api/kandidat/mocks/kandidatliste.mock';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { getMock } from '@/mocks/mockUtils';
import { Faker, en, nb_NO } from '@faker-js/faker';
import { HttpResponse } from 'msw';

const TOTAL_MOCK_KANDIDATER = 300;
const FAST_SEED = 42;

function genererKandidater(): KandidatListeKandidatDTO[] {
  const faker = new Faker({ locale: [nb_NO, en] });
  faker.seed(FAST_SEED);
  const kandidater: KandidatListeKandidatDTO[] = [];
  for (let i = 0; i < TOTAL_MOCK_KANDIDATER; i++) {
    const baseKandidatData = getSingleKandidatDataSchema(i + 1);
    kandidater.push(
      mapKandidatDataToKandidatListeKandidat(baseKandidatData, i + 1),
    );
  }
  return kandidater;
}

const mockKandidater = genererKandidater();

const mockFormidlingerAvUsynligKandidat = [
  {
    id: '199',
    fornavn: 'FORSIKTIG',
    mellomnavn: null,
    etternavn: 'BLOKKFLØYTE',
    utfall: 'IKKE_PRESENTERT',
    lagtTilAvIdent: 'Z993141',
    lagtTilAvNavn: 'F_Z993141 E_Z993141',
    lagtTilTidspunkt: '2025-05-08T15:05:41.567',
    arkivert: false,
    arkivertAvIdent: null,
    arkivertAvNavn: null,
    arkivertTidspunkt: null,
  },
];

export const kandidaterMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidater`,
  ({ request }) => {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const stillingsId = segments[segments.indexOf('kandidater') - 1];

    const side = Number(url.searchParams.get('side') ?? '1');
    const antall = Number(url.searchParams.get('antall') ?? '25');

    let kandidater = [...mockKandidater];

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
      totaltAntallKandidater: kandidater.length,
      kandidater: paginert,
      formidlingerAvUsynligKandidat: mockFormidlingerAvUsynligKandidat,
    });
  },
);
