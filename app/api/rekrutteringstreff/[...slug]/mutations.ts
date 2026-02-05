'use client';

import { oppdaterRekrutteringstreffMock } from './oppdaterRekrutteringstreffMock';
import { RekrutteringstreffUtenHendelserSchema } from './useRekrutteringstreff';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, putApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const rekrutteringstreffEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}`;

export const MAKS_LENGDE_TITTEL = 100;
export const MAKS_LENGDE_GATEADRESSE = 200;

export const OppdaterRekrutteringstreffSchema = z.object({
  tittel: z
    .string()
    .trim()
    .min(1, 'Tittel må fylles ut')
    .max(
      MAKS_LENGDE_TITTEL,
      `Tittelen kan ikke ha mer enn ${MAKS_LENGDE_TITTEL} tegn`,
    )
    .optional(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  svarfrist: z.string().nullable().optional(),
  gateadresse: z
    .string()
    .trim()
    .min(1, 'Gateadresse må fylles ut')
    .min(3, 'Gateadresse må være minst 3 tegn')
    .max(
      MAKS_LENGDE_TITTEL,
      `Gateadresse kan ikke ha mer enn ${MAKS_LENGDE_TITTEL} tegn`,
    ),
  postnummer: z
    .string()
    .trim()
    .min(1, 'Postnummer må fylles ut')
    .min(4, 'Postnummer skal være 4 tall')
    .max(4, 'Postnummer skal være 4 tall'),
  poststed: z.string().nullable().optional(),
  kommune: z.string().nullable().optional(),
  kommunenummer: z.string().nullable().optional(),
  fylke: z.string().nullable().optional(),
  fylkesnummer: z.string().nullable().optional(),
  tittelKiLoggId: z.string().nullable().optional(),
  lagreLikevel: z.boolean().optional(),
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

export const slettRekrutteringstreff = (id: string) =>
  deleteApi(rekrutteringstreffEndepunkt(id));

export const oppdaterRekrutteringstreffMSWHandler = http.put(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  ({ params }) =>
    HttpResponse.json(oppdaterRekrutteringstreffMock(params.id as string)),
);

export const slettRekrutteringstreffMSWHandler = http.delete(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  () => new HttpResponse(null, { status: 204 }),
);
