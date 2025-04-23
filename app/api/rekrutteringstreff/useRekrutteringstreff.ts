'use client';

/**
 * Endepunkt /useRekrutteringstreff
 */
import { RekrutteringstreffAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { rekrutteringstreffMock } from './mocks/rekrutteringstreffMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const rekrutteringstreffEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}`;

const HendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string().nullable(),
});

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
  hendelser: z.array(HendelseSchema),
});

export type RekrutteringstreffDTO = z.infer<typeof RekrutteringstreffSchema>;
export type HendelseDTO = z.infer<typeof HendelseSchema>;

export const useRekrutteringstreff = (id: string) => {
  if (!id) {
    throw new Error('ID må være definert');
  }

  return useSWRImmutable(
    rekrutteringstreffEndepunkt(id),
    getAPIwithSchema(RekrutteringstreffSchema),
  );
};

export const rekrutteringstreffMirage = (server: any) => {
  server.get(`${RekrutteringstreffAPI.internUrl}/:id`, () => {
    return rekrutteringstreffMock;
  });
};
