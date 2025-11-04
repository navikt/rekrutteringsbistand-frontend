import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const EndringsfeltSchema = z.object({
  gammelVerdi: z.string().nullable(),
  nyVerdi: z.string().nullable(),
});

const EndringerDtoSchema = z.object({
  tittel: EndringsfeltSchema.nullable(),
  fraTid: EndringsfeltSchema.nullable(),
  tilTid: EndringsfeltSchema.nullable(),
  svarfrist: EndringsfeltSchema.nullable(),
  gateadresse: EndringsfeltSchema.nullable(),
  postnummer: EndringsfeltSchema.nullable(),
  poststed: EndringsfeltSchema.nullable(),
  innlegg: EndringsfeltSchema.nullable(),
});

export type Endringsfelt<T> = { gammelVerdi: T | null; nyVerdi: T | null };
export type EndringerDto = z.infer<typeof EndringerDtoSchema>;

const rekrutteringstreffEndringerEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/endringer`;

export const registrerEndring = async (
  rekrutteringstreffId: string,
  data: EndringerDto,
): Promise<void> => {
  EndringerDtoSchema.parse(data);
  await postApi(
    rekrutteringstreffEndringerEndepunkt(rekrutteringstreffId),
    data,
  );
};

export const registrerEndringMSWHandler = http.post(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/endringer`,
  () => new HttpResponse(null, { status: 201 }),
);
