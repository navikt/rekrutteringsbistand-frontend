import { innleggMock } from './innleggMock';
import type { InnleggDTO } from './useInnlegg';
import { InnleggSchema } from './useInnlegg';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi, putApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

// Schemas som kun brukes for mutations
const OpprettInnleggDtoSchema = z.object({
  tittel: z.string().min(1, 'Tittel kan ikke være tom'),
  htmlContent: z.string().min(1, 'Innhold kan ikke være tomt'),
  opprettetAvPersonNavn: z.string().nullable().optional(),
  opprettetAvPersonBeskrivelse: z
    .string()
    .min(1, 'OpprettetAvPersonBeskrivelse kan ikke være tomt'),
  sendesTilJobbsokerTidspunkt: z
    .string()
    .min(1, 'SendesTilJobbsokerTidspunkt kan ikke være tomt'),
});

// DTOs
export type OpprettInnleggDto = z.infer<typeof OpprettInnleggDtoSchema>;
export type OppdaterInnleggDto = z.infer<typeof OpprettInnleggDtoSchema>;

const InnleggResponseDtoSchema = InnleggSchema;

const rekrutteringstreffInnleggEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/innlegg`;

const rekrutteringstreffEnkeltInnleggEndepunkt = (
  rekrutteringstreffId: string,
  innleggId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/innlegg/${innleggId}`;

export const opprettInnlegg = async (
  rekrutteringstreffId: string,
  data: OpprettInnleggDto,
): Promise<InnleggDTO> => {
  OpprettInnleggDtoSchema.parse(data);
  const response = await postApi(
    rekrutteringstreffInnleggEndepunkt(rekrutteringstreffId),
    data,
  );
  return InnleggResponseDtoSchema.parse(response);
};

export const oppdaterInnlegg = async (
  rekrutteringstreffId: string,
  innleggId: string,
  data: OppdaterInnleggDto,
): Promise<InnleggDTO> => {
  OpprettInnleggDtoSchema.parse(data);
  const response = await putApi(
    rekrutteringstreffEnkeltInnleggEndepunkt(rekrutteringstreffId, innleggId),
    data,
  );
  return InnleggResponseDtoSchema.parse(response);
};

export const opprettInnleggMSWHandler = http.post(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg`,
  () => HttpResponse.json(innleggMock[0]),
);

export const oppdaterInnleggMSWHandler = http.put(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg/:innleggId`,
  () => HttpResponse.json(innleggMock[0]),
);
