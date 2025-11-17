'use client';

/**
 * Endepunkt /useRekrutteringstreffOversikt
 */
import { rekrutteringstreffOversiktMock } from './useRekrutteringstreffOversiktMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const rekrutteringstreffOversiktEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

const RekrutteringstreffStatusEnum = z.enum([
  'UTKAST',
  'PUBLISERT',
  'FULLFØRT',
  'AVLYST',
  'SLETTET',
]);
export type RekrutteringstreffStatus = z.infer<
  typeof RekrutteringstreffStatusEnum
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
  status: RekrutteringstreffStatusEnum,
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
  opprettetAvTidspunkt: z.string(),
  antallArbeidsgivere: z.int(),
  antallJobsøkere: z.int(),
});

const RekrutteringstreffOversiktSchema = z.array(RekrutteringstreffSchema);

export type RekrutteringstreffOversiktDTO = z.infer<
  typeof RekrutteringstreffOversiktSchema
>;

export type RekrutteringstreffFraSøkeresultatDTO = z.infer<
  typeof RekrutteringstreffSchema
>;

export const useRekrutteringstreffOversikt = () =>
  useSWRGet(
    rekrutteringstreffOversiktEndepunkt(),
    RekrutteringstreffOversiktSchema,
  );

export const rekrutteringstreffOversiktMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}`,
  () => HttpResponse.json(rekrutteringstreffOversiktMock),
);
