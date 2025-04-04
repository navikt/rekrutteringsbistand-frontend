'use client';

import { PamSearchAPI } from '../../api-routes';
import { getApiWithSchemaEs } from '../../fetcher';
import { faker } from '@faker-js/faker/locale/nb_NO';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const finnArbeidsgiverEndepunkt = (søkeord: string) => {
  return PamSearchAPI.internUrl + `/underenhet?q=${søkeord}`;
};

export const ArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
  organisasjonsform: z.string(),
  antallAnsatte: z.number().optional().nullable(),
  overordnetEnhet: z.string().optional().nullable(),
  adresse: z
    .object({
      land: z.string(),
      landkode: z.string(),
      kommune: z.string(),
      kommunenummer: z.string(),
      poststed: z.string(),
      postnummer: z.string(),
      adresse: z.string(),
    })
    .nullable(),
});
const ArbeidsgiverSchemaDTO = z.array(ArbeidsgiverSchema);

export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;

export const fetchArbeidsgivere = getApiWithSchemaEs(ArbeidsgiverSchemaDTO);

export const useFinnArbeidsgiver = (søkeord?: string) =>
  useSWRImmutable(
    søkeord
      ? {
          url: finnArbeidsgiverEndepunkt(søkeord),
        }
      : null,
    (data) => fetchArbeidsgivere(data),
  );

export const arbeidsgiverMirage = (server: any) => {
  server.get(PamSearchAPI.internUrl + `/underenhet`, () => {
    return {
      took: 2,
      timed_out: false,
      _shards: {
        total: 3,
        successful: 3,
        skipped: 0,
        failed: 0,
      },
      hits: {
        total: {
          value: 1,
          relation: 'eq',
        },
        max_score: 10.641023,
        hits: [
          {
            _index: 'underenhet20250211',
            _id: '315414822',
            _score: 10.641023,
            _source: {
              organisasjonsnummer: faker.string.numeric(9),
              navn: faker.company.name(),
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
              naringskoder: null,
            },
          },
          {
            _index: 'underenhet20250211',
            _id: '315414822',
            _score: 10.641023,
            _source: {
              organisasjonsnummer: faker.string.numeric(9),
              navn: faker.company.name(),
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
              naringskoder: null,
            },
          },
          {
            _index: 'underenhet20250211',
            _id: '315414822',
            _score: 10.641023,
            _source: {
              organisasjonsnummer: faker.string.numeric(9),
              navn: faker.company.name(),
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
              naringskoder: null,
            },
          },
          {
            _index: 'underenhet20250211',
            _id: '315414822',
            _score: 10.641023,
            _source: {
              organisasjonsnummer: faker.string.numeric(9),
              navn: 'TEST PLUTSELIG KATT',
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
              naringskoder: null,
            },
          },
        ],
      },
    };
  });
};
