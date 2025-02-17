'use client';
/**
 * Endepunkt /bruker
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

import { Server } from 'miragejs';
import { Roller } from '../../components/tilgangskontroll/roller';
import { getAPIwithSchema } from '../fetcher';
import { brukerMock } from './mocks/useBrukerMock';

const brukerEndepunkt = '/api/bruker';

const BrukerSchema = z.object({
  navIdent: z.string(),
  roller: z.array(z.nativeEnum(Roller)),
});

export type BrukerDTO = z.infer<typeof BrukerSchema>;

export const useBruker = () =>
  useSWRImmutable(brukerEndepunkt, getAPIwithSchema(BrukerSchema));

export const brukerMirage = (server: Server) => {
  return server.get(brukerEndepunkt, () => {
    const rolle =
      localStorage.getItem('DEV-ROLLE') ||
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER;

    const bruker = localStorage.getItem('DEV-BRUKER') || 'TestIdent';

    return {
      ...brukerMock,
      roller: [rolle],
      navIdent: bruker,
    };
  });
};
