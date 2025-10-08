'use client';

import { RekrutteringstreffUtenHendelserSchema } from './useRekrutteringstreff';
import { deleteApi, putApi } from '@/app/api/fetcher';
import { z } from 'zod';

const rekrutteringstreffEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}`;

export const MAX_TITLE_LENGTH = 100;

export const OppdaterRekrutteringstreffSchema = z.object({
  tittel: z
    .string()
    .trim()
    .min(1, 'Tittel kan ikke være tom.')
    .max(
      MAX_TITLE_LENGTH,
      `Tittelen kan ikke ha mer enn ${MAX_TITLE_LENGTH} tegn.`,
    )
    .optional(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  svarfrist: z.string().nullable().optional(),
  gateadresse: z.string().nullable().optional(),
  postnummer: z.string().nullable().optional(),
  poststed: z.string().nullable().optional(),
});

export type OppdaterRekrutteringstreffDTO = z.infer<
  typeof OppdaterRekrutteringstreffSchema
>;

export const oppdaterRekrutteringstreff = async (
  id: string,
  data: OppdaterRekrutteringstreffDTO,
) => {
  OppdaterRekrutteringstreffSchema.parse(data);
  const response = await putApi(rekrutteringstreffEndepunkt(id), data);
  return RekrutteringstreffUtenHendelserSchema.parse(response);
};

export const slettRekrutteringstreff = (id: string) => {
  return deleteApi(rekrutteringstreffEndepunkt(id));
};

export const rekrutteringstreffSlugMutationsMirage = (server: any) => {
  server.put(rekrutteringstreffEndepunkt(':id'), (_: any, request: any) => {
    const { id } = request.params;
    return {
      id,
      tittel: 'Oppdatert treff',
      beskrivelse: 'Oppdatert beskrivelse',
      fraTid: null,
      tilTid: null,
      svarfrist: null,
      gateadresse: null,
      postnummer: null,
      poststed: null,
      status: 'UTKAST',
      opprettetAvPersonNavident: 'A123456',
      opprettetAvNavkontorEnhetId: '1234',
    };
  });

  server.delete(rekrutteringstreffEndepunkt(':id'), () => undefined);
};
