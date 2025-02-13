'use client';
/**
 * Endepunkt /usePamGeografi
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

import lokasjonerMock from './lokasjoner.mock.json';

const pamGeografiEndepunkt = '/api/pam-geografi';

export enum GeografiType {
  KOMMUNE = 'KOMMUNE',
  LAND = 'LAND',
  FYLKE = 'FYLKE',
}

const PamGeografiSchema = z.object({
  navn: z.string(),
  type: z.nativeEnum(GeografiType),
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
});
const PamGeografiSchemaDTO = z.array(PamGeografiSchema);

export type PamGeografi = z.infer<typeof PamGeografiSchema>;

export const usePamGeografi = () =>
  useSWRImmutable(pamGeografiEndepunkt, getAPIwithSchema(PamGeografiSchemaDTO));

export const pamGeografiMirage = (server: any) =>
  server.get(pamGeografiEndepunkt, () => {
    return lokasjonerMock;
  });
