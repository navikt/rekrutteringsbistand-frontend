'use client';

/**
 * Endepunkt /useRekrutteringstreff
 */
import { RekrutteringstreffAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { rekrutteringstreffMock } from './mocks/rekrutteringstreffMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const rekrutteringstreffEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

const RekrutteringstreffEndepunkt = (id: string) => {
  return `${RekrutteringstreffAPI.internUrl}/${id}`;
};

const RekrutteringstreffSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string(),
  fraTid: z.string(),
  tilTid: z.string(),
  sted: z.string(),
  status: z.string(),
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
});

export type RekrutteringstreffDTO = z.infer<typeof RekrutteringstreffSchema>;

export const useRekrutteringstreff = (id: string) => {
  if (!id) {
    throw new Error('ID må være definert for å hente rekrutteringstreff');
  }

  return useSWRImmutable(
    RekrutteringstreffEndepunkt(id),
    getAPIwithSchema(RekrutteringstreffSchema),
  );
};

export const rekrutteringstreffMirage = (server: any) => {
  server.get(`${RekrutteringstreffAPI.internUrl}/:id`, () => {
    return rekrutteringstreffMock;
  });
};
