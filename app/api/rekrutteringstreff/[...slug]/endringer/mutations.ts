import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const EndringsfeltSchema = z.object({
  gammelVerdi: z.string().nullable(),
  nyVerdi: z.string().nullable(),
  skalVarsle: z.boolean(),
});

const EndringerDtoSchema = z.object({
  navn: EndringsfeltSchema.nullable(),
  sted: EndringsfeltSchema.nullable(),
  tidspunkt: EndringsfeltSchema.nullable(),
  svarfrist: EndringsfeltSchema.nullable(),
  introduksjon: EndringsfeltSchema.nullable(),
});

export type Endringsfelt<T> = {
  gammelVerdi: T | null;
  nyVerdi: T | null;
  skalVarsle: boolean;
};
export type EndringerDto = z.infer<typeof EndringerDtoSchema>;

// Display-tekster for meldingsmaler (matcher backend MalParameter enum)
// Brukes for å bygge liste over endringer i meldinger
export const EndringsfeltDisplayTekst: Record<keyof EndringerDto, string> = {
  navn: 'Nytt navn',
  sted: 'Nytt sted',
  tidspunkt: 'Nytt tidspunkt',
  svarfrist: 'Ny svarfrist',
  introduksjon: 'Ny introduksjon',
};

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
