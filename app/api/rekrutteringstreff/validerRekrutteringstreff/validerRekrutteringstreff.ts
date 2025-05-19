import { postApi } from '../../fetcher';
import { validerRekrutteringstreffMock } from '../mocks/validerRekrutteringstreffMock';
import { z } from 'zod';

export const ValiderRekrutteringstreffDtoSchema = z.object({
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
});

export type ValiderRekrutteringstreffDto = z.infer<
  typeof ValiderRekrutteringstreffDtoSchema
>;

export const ValiderRekrutteringstreffResponsDtoSchema = z.object({
  bryterRetningslinjer: z.boolean(),
  begrunnelse: z.string(),
});

export type ValiderRekrutteringstreffResponsDto = z.infer<
  typeof ValiderRekrutteringstreffResponsDtoSchema
>;

export const validerRekrutteringstreffEndepunkt = () =>
  '/api/rekrutteringstreff/valider';

export const validerRekrutteringstreff = async (
  tittel: string,
): Promise<ValiderRekrutteringstreffResponsDto> => {
  const data: ValiderRekrutteringstreffDto = { tittel, beskrivelse: null };
  ValiderRekrutteringstreffDtoSchema.parse(data);
  const response = await postApi(validerRekrutteringstreffEndepunkt(), data);
  return ValiderRekrutteringstreffResponsDtoSchema.parse(response);
};

export const validerRekrutteringstreffMirage = (server: any) => {
  server.post('/api/rekrutteringstreff/valider', () =>
    validerRekrutteringstreffMock(),
  );
};
