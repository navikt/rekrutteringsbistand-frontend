/**
 * Endepunkt /bruker
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

const brukerEndepunkt = '/api/bruker';

const BrukerSchema = z.object({
  navIdent: z.string(),
});

export type BrukerDTO = z.infer<typeof BrukerSchema>;

export const useBruker = (): BrukerDTO => {
  return useSWRImmutable(brukerEndepunkt, getAPIwithSchema(BrukerSchema));
};

export const brukerMock: BrukerDTO = {
  navIdent: 'Ola Mockman',
};
