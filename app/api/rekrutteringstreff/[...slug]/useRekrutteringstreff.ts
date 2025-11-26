'use client';

/**
 * Endepunkt /useRekrutteringstreff
 */
import { rekrutteringstreffMock } from './rekrutteringstreffMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const rekrutteringstreffEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}`;

export const HendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string().nullable(),
});

export const RekrutteringstreffBaseSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
  fraTid: z.string().nullable(),
  tilTid: z.string().nullable(),
  svarfrist: z.string().nullable(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
  kommune: z.string().nullable(),
  kommunenummer: z.string().nullable(),
  fylke: z.string().nullable(),
  fylkesnummer: z.string().nullable(),
  status: z.string(),
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
  antallArbeidsgivere: z.int().nullable(),
  antallJobbsøkere: z.int().nullable(),
});

export const RekrutteringstreffSchema = z.object({
  rekrutteringstreff: RekrutteringstreffBaseSchema,
  hendelser: z.array(HendelseSchema),
});

export const RekrutteringstreffUtenHendelserSchema =
  RekrutteringstreffBaseSchema;

export type RekrutteringstreffDTO = z.infer<typeof RekrutteringstreffSchema>;
export type RekrutteringstreffUtenHendelserDTO = z.infer<
  typeof RekrutteringstreffUtenHendelserSchema
>;
export type HendelseDTO = z.infer<typeof HendelseSchema>;

export const useRekrutteringstreff = (id: string) => {
  if (!id) {
    throw new Error('ID må være definert');
  }

  return useSWRGet(rekrutteringstreffEndepunkt(id), RekrutteringstreffSchema);
};

export const rekrutteringstreffMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  () => HttpResponse.json(rekrutteringstreffMock),
);
