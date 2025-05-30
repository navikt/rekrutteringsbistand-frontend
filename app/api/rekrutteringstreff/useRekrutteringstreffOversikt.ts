'use client';

/**
 * Endepunkt /useRekrutteringstreffOversikt
 */
import { RekrutteringstreffAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { rekrutteringstreffOversiktMock } from './mocks/rekrutteringstreffOversiktMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const rekrutteringstreffOversiktEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

const RekrutteringstreffOversiktSchema = z.array(
  z.object({
    id: z.string(),
    tittel: z.string(),
    beskrivelse: z.string(),
    fraTid: z.string(),
    tilTid: z.string(),
    gateadresse: z.string(),
    postnummer: z.string(),
    poststed: z.string(),
    status: z.string(),
    opprettetAvPersonNavident: z.string(),
    opprettetAvNavkontorEnhetId: z.string(),
  }),
);

export type RekrutteringstreffOversiktDTO = z.infer<
  typeof RekrutteringstreffOversiktSchema
>;

export const useRekrutteringstreffOversikt = () =>
  useSWRImmutable(
    rekrutteringstreffOversiktEndepunkt(),
    getAPIwithSchema(RekrutteringstreffOversiktSchema),
  );

export const rekrutteringstreffOversiktMirage = (server: any) => {
  return server.get(
    rekrutteringstreffOversiktEndepunkt(),
    () => rekrutteringstreffOversiktMock,
  );
};
