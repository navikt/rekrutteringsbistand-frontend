import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const FieldSchema = z.object({
  value: z.string().nullable(),
  endret: z.boolean(),
});

const EndringerDtoSchema = z.object({
  tittel: FieldSchema,
  beskrivelse: FieldSchema,
  fraTid: FieldSchema,
  tilTid: FieldSchema,
  svarfrist: FieldSchema,
  gateadresse: FieldSchema,
  postnummer: FieldSchema,
  poststed: FieldSchema,
  htmlContent: FieldSchema,
});

const RegistrerEndringDtoSchema = z.object({
  gamleVerdierForEndringer: EndringerDtoSchema.nullable(),
});

export type Field<T> = z.infer<typeof FieldSchema> & { value?: T | null };
export type EndringerDto = z.infer<typeof EndringerDtoSchema>;
export type RegistrerEndringDTO = z.infer<typeof RegistrerEndringDtoSchema>;

const rekrutteringstreffEndringerEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/endringer`;

export const registrerEndring = async (
  rekrutteringstreffId: string,
  data: RegistrerEndringDTO,
): Promise<void> => {
  RegistrerEndringDtoSchema.parse(data);
  await postApi(
    rekrutteringstreffEndringerEndepunkt(rekrutteringstreffId),
    data,
  );
};

export const registrerEndringMSWHandler = http.post(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/endringer`,
  () => new HttpResponse(null, { status: 201 }),
);
