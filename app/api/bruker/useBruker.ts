'use client';
/**
 * Endepunkt /bruker
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { Rolle } from '../../../types/Roller';
import { getAPIwithSchema } from '../fetcher';
import { brukerMock } from './mocks/useBrukerMock';

const brukerEndepunkt = '/api/bruker';

const BrukerSchema = z.object({
  navIdent: z.string(),
  roller: z.array(z.nativeEnum(Rolle)),
});

export type BrukerDTO = z.infer<typeof BrukerSchema>;

export const useBruker = () =>
  useSWRImmutable(brukerEndepunkt, getAPIwithSchema(BrukerSchema));

export const brukerMirage = (server: any) => {
  return server.get(brukerEndepunkt, () => brukerMock);
};
