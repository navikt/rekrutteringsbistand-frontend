'use client';

import { nyheterSchema } from './[...slug]/nyhet-admin';
import { BrukerAPI } from '@/app/api/api-routes';
import { nyheterMock } from '@/app/api/bruker/nyheter/nyheter.mock';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const hentNyheterEndepunkt = `${BrukerAPI.internUrl}/nyheter`;

// Schema for array av nyheter
const nyheterArraySchema = z.array(nyheterSchema);

export type NyheterArrayDTO = z.infer<typeof nyheterArraySchema>;

export const useNyheter = () =>
  useSWRImmutable(hentNyheterEndepunkt, getAPIwithSchema(nyheterArraySchema));

export const nyheterMirage = (server: any) => {
  server.get(hentNyheterEndepunkt, () => {
    return nyheterMock;
  });
};
