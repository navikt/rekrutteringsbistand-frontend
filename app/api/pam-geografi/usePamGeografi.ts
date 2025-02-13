'use client';
/**
 * Endepunkt /usePamGeografi
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

import lokasjonerMock from './lokasjoner.mock.json';

const pamGeografiEndepunkt = '/api/pam-geografi';

const PamGeografiSchema = z.array(
  z.object({
    navn: z.string(),
    type: z.string(),
    lokasjon: z.object({
      adresse: z.string().nullable(),
      postnummer: z.string().nullable(),
      poststed: z.string().nullable(),
      fylke: z.string().nullable(),
      fylkesnummer: z.string().nullable(),
      kommune: z.string().nullable(),
      kommunenummer: z.string().nullable(),
      land: z.string().nullable(),
    }),
  }),
);

export type usePamGeografiDTO = z.infer<typeof PamGeografiSchema>;

//TODO Ta i bruk som ny geografi hook
export const usePamGeografi = () =>
  useSWRImmutable(pamGeografiEndepunkt, getAPIwithSchema(PamGeografiSchema));

export const stillingsTittelMirage = (server: any) =>
  server.get(pamGeografiEndepunkt, () => {
    return lokasjonerMock;
  });
