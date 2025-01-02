'use client';
/**
 * Endepunkt /geografi
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../fetcher';
import fylkeMock from './fylkeMock.json';
import { fylkeSchema, kommuneSchema, landSchema } from './geografi.dto';
import kommuneMock from './kommuneMock.json';
import landMock from './landMock.json';
const geografiEndepunkt = '/api/stilling/geografi';

const geografiSchema = z.object({
  fylker: z.array(fylkeSchema),
  kommuner: z.array(kommuneSchema),
  land: z.array(landSchema).optional(),
});

export type geografiDTO = z.infer<typeof geografiSchema>;

export const useGeografi = () =>
  useSWRImmutable(geografiEndepunkt, getAPIwithSchema(geografiSchema));

export const geografiMirage = (server: any) =>
  server.get(geografiEndepunkt, () => {
    return {
      fylker: fylkeMock,
      kommuner: kommuneMock,
      land: landMock,
    };
  });
