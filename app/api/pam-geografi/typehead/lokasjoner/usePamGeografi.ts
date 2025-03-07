'use client';

import { getAPIwithSchema } from '../../../fetcher';
import lokasjonerMock from './lokasjoner.mock.json';
import { useMemo } from 'react';
/**
 * Endepunkt /usePamGeografi
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const pamGeografiEndepunkt = '/api/pam-geografi/typehead/lokasjoner';

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

export const usePamGeografi = () => {
  const hook = useSWRImmutable(
    pamGeografiEndepunkt,
    getAPIwithSchema(PamGeografiSchemaDTO),
  );

  const filteredData = useMemo(() => {
    return hook.data?.filter(
      (pamGeografi) =>
        pamGeografi.type !== GeografiType.LAND ||
        // Behold Norge i listen
        (pamGeografi.type === GeografiType.LAND &&
          pamGeografi.navn?.toUpperCase() === 'NORGE'),
    );
  }, [hook.data]);

  return {
    ...hook,
    data: filteredData,
  };
};

export const pamGeografiMirage = (server: any) =>
  server.get(pamGeografiEndepunkt, () => {
    return lokasjonerMock;
  });
