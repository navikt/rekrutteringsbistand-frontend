import { PamSearchAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { faker } from '@faker-js/faker/locale/nb_NO';
import { HttpResponse } from 'msw';

export const finnArbeidsgiverEndepunkt = (søkeord: string) => {
  return PamSearchAPI.internUrl + `/underenhet?q=${søkeord}`;
};

export const arbeidsgiverMSWHandler = getMock(
  PamSearchAPI.internUrl + `/underenhet`,
  () => {
    faker.seed(1337);
    return HttpResponse.json({
      took: 2,
      timed_out: false,
      _shards: { total: 3, successful: 3, skipped: 0, failed: 0 },
      hits: {
        total: { value: 3, relation: 'eq' },
        max_score: 10.64,
        hits: Array.from({ length: 3 }).map((_, idx) => ({
          _index: 'underenhet20250211',
          _id: `${idx}`,
          _score: 10.64,
          _source: {
            organisasjonsnummer: faker.string.numeric(9),
            navn: idx === 2 ? 'TEST PLUTSELIG KATT' : faker.company.name(),
            organisasjonsform: 'BEDR',
            antallAnsatte: 3,
            overordnetEnhet: faker.string.numeric(9),
            adresse: {
              land: 'Norge',
              landkode: 'NO',
              kommune: faker.location.county(),
              kommunenummer: faker.string.numeric(4),
              poststed: faker.location.street(),
              postnummer: faker.location.zipCode(),
              adresse: faker.location.streetAddress(),
            },
            naringskoder:
              idx === 2
                ? [
                    {
                      kode: '86.107',
                      beskrivelse:
                        'Rehabilitering- og opptreningsinstitusjoner',
                    },
                  ]
                : null,
          },
        })),
      },
    });
  },
);
