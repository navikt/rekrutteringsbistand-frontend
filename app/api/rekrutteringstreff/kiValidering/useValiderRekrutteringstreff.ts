'use client';

import { validerRekrutteringstreffMock } from './validerRekrutteringstreffMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

export const validerRekrutteringstreffEndepunkt = (
  id: string | ':id' = ':id',
) => `${RekrutteringstreffAPI.internUrl}/${id}/ki/valider`;

const ReqSchema = z.object({
  feltType: z.string(),
  tekst: z.string(),
});
export type ValiderRekrutteringstreffDto = z.infer<typeof ReqSchema>;

const ResponseSchema = z.object({
  loggId: z.string(),
  bryterRetningslinjer: z.boolean(),
  begrunnelse: z.string(),
});
export type ValiderRekrutteringstreffResponsDto = z.infer<
  typeof ResponseSchema
>;

const fetcher = async (
  _key: string,
  { arg }: { arg: ValiderRekrutteringstreffDto },
): Promise<ValiderRekrutteringstreffResponsDto> => {
  const tekst = arg.tekst
    .replace(/<[^>]+>/g, ' ') // bytt ut alle HTML-tagger med space
    .replace(/\s+/g, ' ') // kollaps whitespace
    .trim();
  const payload = { ...arg, tekst };
  ReqSchema.parse(arg);
  const res = await postApi(_key, payload);
  return ResponseSchema.parse(res);
};

export const useValiderRekrutteringstreff = (treffId?: string) =>
  useSWRMutation<
    ValiderRekrutteringstreffResponsDto,
    Error,
    string,
    ValiderRekrutteringstreffDto
  >(validerRekrutteringstreffEndepunkt(treffId ?? ':id'), fetcher);

export const validerRekrutteringstreffMSWHandler = http.post(
  validerRekrutteringstreffEndepunkt(':id'),
  () => HttpResponse.json(validerRekrutteringstreffMock()),
);
