'use client';

import { postApi } from '../../fetcher';
import { validerRekrutteringstreffMock } from '../mocks/validerRekrutteringstreffMock';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

const validerRekrutteringstreffEndepunkt = '/api/rekrutteringstreff/valider';

const ReqSchema = z.object({
  tittel: z.string().min(1).nullable(),
  beskrivelse: z.string().nullable(),
});
export type ValiderRekrutteringstreffDto = z.infer<typeof ReqSchema>;

const ResponseSchema = z.object({
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
  ReqSchema.parse(arg);
  const res = await postApi(validerRekrutteringstreffEndepunkt, arg);
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
