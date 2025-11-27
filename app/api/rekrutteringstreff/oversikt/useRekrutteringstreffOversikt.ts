'use client';

/**
 * Endepunkt /useRekrutteringstreffOversikt
 */
import { rekrutteringstreffOversiktMock } from './useRekrutteringstreffOversiktMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const rekrutteringstreffOversiktEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

export const RekrutteringstreffStatusEnum = z.enum(
  Object.values(RekrutteringstreffStatus) as [string, ...string[]],
);
export type RekrutteringstreffStatusType = z.infer<
  typeof RekrutteringstreffStatusEnum
>;

const RekrutteringstreffSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  gateadresse: z.string().nullable().optional(),
  postnummer: z.string().nullable().optional(),
  poststed: z.string().nullable().optional(),
  status: RekrutteringstreffStatusEnum,
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
  opprettetAvTidspunkt: z.string().optional(),
  antallArbeidsgivere: z.int().nullable().optional(),
  antallJobsøkere: z.int().nullable().optional(),
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
