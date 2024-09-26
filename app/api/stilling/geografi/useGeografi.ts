'use client';
/**
 * Endepunkt /geografi
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../fetcher';
import fylkeMock from './fylkeMock.json';
import kommuneMock from './kommuneMock.json';
import { fylkeSchema, kommuneSchema } from './zod';

const geografiEndepunkt = '/api/stilling/geografi';

const geografiSchema = z.object({
  fylker: z.array(fylkeSchema),
  kommuner: z.array(kommuneSchema),
});

export type geografiDTO = z.infer<typeof geografiSchema>;

export const useGeografi = () =>
  useSWRImmutable(geografiEndepunkt, getAPIwithSchema(geografiSchema));

export const geografiMirage = (server: any) =>
  server.get(geografiEndepunkt, () => {
    return {
      fylker: fylkeMock,
      kommuner: kommuneMock,
    };
  });
