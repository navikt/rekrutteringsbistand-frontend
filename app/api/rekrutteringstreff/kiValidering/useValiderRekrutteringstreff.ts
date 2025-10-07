'use client';

import { validerRekrutteringstreffMock } from './validerRekrutteringstreffMock';
import { postApi } from '@/app/api/fetcher';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

const validerRekrutteringstreffEndepunkt = '/api/rekrutteringstreff/ki/valider';

const ReqSchema = z.object({
  treffId: z.string(),
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
  _: string,
  { arg }: { arg: ValiderRekrutteringstreffDto },
): Promise<ValiderRekrutteringstreffResponsDto> => {
  const tekst = arg.tekst
    .replace(/<[^>]+>/g, ' ') // bytt ut alle HTML-tagger med space
    .replace(/\s+/g, ' ') // kollaps whitespace
    .trim();
  const payload = { ...arg, tekst };
  ReqSchema.parse(arg);
  const res = await postApi(validerRekrutteringstreffEndepunkt, payload);
  return ResponseSchema.parse(res);
};

export const useValiderRekrutteringstreff = () =>
  useSWRMutation<
    ValiderRekrutteringstreffResponsDto,
    Error,
    string,
    ValiderRekrutteringstreffDto
  >(validerRekrutteringstreffEndepunkt, fetcher);

export const validerRekrutteringstreffMirage = (server: any): void => {
  server.post(validerRekrutteringstreffEndepunkt, () => {
    return validerRekrutteringstreffMock();
  });
};
