'use client';
/**
 * Endepunkt /bruker
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { Rolle } from '../../components/tilgangskontroll/Roller';
import { getAPIwithSchema } from '../fetcher';

const brukerEndepunkt = '/api/bruker';

const BrukerSchema = z.object({
  navIdent: z.string(),
  roller: z.array(z.nativeEnum(Rolle)),
});

export type BrukerDTO = z.infer<typeof BrukerSchema>;

export const useBruker = () =>
  useSWRImmutable(brukerEndepunkt, getAPIwithSchema(BrukerSchema));
