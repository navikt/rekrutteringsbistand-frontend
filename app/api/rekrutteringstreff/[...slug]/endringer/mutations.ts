import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export enum Endringsfelttype {
  NAVN = 'NAVN',
  TIDSPUNKT = 'TIDSPUNKT',
  SVARFRIST = 'SVARFRIST',
  STED = 'STED',
  INTRODUKSJON = 'INTRODUKSJON',
}

const EndringerDtoSchema = z.object({
  endredeFelter: z.array(z.nativeEnum(Endringsfelttype)),
});
export type EndringerDto = z.infer<typeof EndringerDtoSchema>;

export const EndringsfeltDisplayTekst: Record<Endringsfelttype, string> = {
  [Endringsfelttype.NAVN]: 'Nytt navn',
  [Endringsfelttype.STED]: 'Nytt sted',
  [Endringsfelttype.TIDSPUNKT]: 'Nytt tidspunkt',
  [Endringsfelttype.SVARFRIST]: 'Ny svarfrist',
  [Endringsfelttype.INTRODUKSJON]: 'Ny introduksjon',
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
