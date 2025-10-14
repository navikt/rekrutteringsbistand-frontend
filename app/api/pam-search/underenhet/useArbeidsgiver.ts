'use client';

import { PamSearchAPI } from '@/app/api/api-routes';
import { getApiWithSchemaEs } from '@/app/api/fetcher';
import { faker } from '@faker-js/faker/locale/nb_NO';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const finnArbeidsgiverEndepunkt = (søkeord: string) => {
  return PamSearchAPI.internUrl + `/underenhet?q=${søkeord}`;
};

const ArbeidsgiverAdresseSchema = z
  .object({
    land: z.string(),
    landkode: z.string(),
    kommune: z.string(),
    kommunenummer: z.string(),
    poststed: z.string(),
    postnummer: z.string(),
    adresse: z.string(),
  })
  .nullable();

const NaringskodeSchema = z.object({
  kode: z.string(),
  beskrivelse: z.string(),
});

export const ArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
  organisasjonsform: z.string(),
  antallAnsatte: z.number().optional().nullable(),
  overordnetEnhet: z.string().optional().nullable(),
  adresse: ArbeidsgiverAdresseSchema,
  naringskoder: z.array(NaringskodeSchema).optional().nullable(),
});
const ArbeidsgiverSchemaDTO = z.array(ArbeidsgiverSchema);

export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgiverAdresseDTO = z.infer<typeof ArbeidsgiverAdresseSchema>;

export const useFinnArbeidsgiver = (søkeord?: string) =>
  useSWRImmutable(
    søkeord
      ? {
          url: finnArbeidsgiverEndepunkt(søkeord),
        }
      : null,
    (data) => getApiWithSchemaEs(ArbeidsgiverSchemaDTO)(data),
  );

export const arbeidsgiverMSWHandler = http.get(
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
