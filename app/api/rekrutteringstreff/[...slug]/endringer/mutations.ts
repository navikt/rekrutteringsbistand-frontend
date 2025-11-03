import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const RegistrerEndringDtoSchema = z.object({
  // Kun gamle verdier - backend henter nye verdier selv

  tittel: z.string().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  svarfrist: z.string().nullable().optional(),
  gateadresse: z.string().nullable().optional(),
  postnummer: z.string().nullable().optional(),
  poststed: z.string().nullable().optional(),
  htmlContent: z.string().nullable().optional(),
});

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
