'use client';

/**
 * Endepunkt /useRekrutteringstreffOversikt
 */
import { rekrutteringstreffOversiktMock } from './useRekrutteringstreffOversiktMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const rekrutteringstreffOversiktEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

const RekrutteringstreffStausEnum = z.enum([
  'UTKAST',
  'PUBLISERT',
  'FULLFØRT',
  'AVLYST',
  'SLETTET',
]);
export type RekrutteringstreffStaus = z.infer<
  typeof RekrutteringstreffStausEnum
>;

const RekrutteringstreffSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string(),
  fraTid: z.string(),
  tilTid: z.string(),
  gateadresse: z.string(),
  postnummer: z.string(),
  poststed: z.string(),
  status: RekrutteringstreffStausEnum,
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
  opprettetAvTidspunkt: z.string(),
});

const RekrutteringstreffOversiktSchema = z.array(RekrutteringstreffSchema);

export type RekrutteringstreffOversiktDTO = z.infer<
  typeof RekrutteringstreffOversiktSchema
>;

export type RekrutteringstreffFraSøkeresultatDTO = z.infer<
  typeof RekrutteringstreffSchema
>;

export const useRekrutteringstreffOversikt = () =>
  useSWRImmutable(
    rekrutteringstreffOversiktEndepunkt(),
    getAPIwithSchema(RekrutteringstreffOversiktSchema),
  );

export const rekrutteringstreffOversiktMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}`,
  () => HttpResponse.json(rekrutteringstreffOversiktMock),
);
