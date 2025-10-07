import { innleggMock } from '../mocks/InnleggMock';
import { InnleggDTO, InnleggSchema } from './useInnlegg';
import { postApi, putApi } from '@/app/api/fetcher';
import { z } from 'zod';

export const InnleggDtoSchema = z.object({
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

export type OpprettInnleggDto = z.infer<typeof InnleggDtoSchema>;
export type OppdaterInnleggDto = z.infer<typeof InnleggDtoSchema>;

export const InnleggResponseDtoSchema = InnleggSchema;

const innleggBaseUrl = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/innlegg`;

const innleggItemUrl = (rekrutteringstreffId: string, innleggId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/innlegg/${innleggId}`;

export const opprettInnlegg = async (
  rekrutteringstreffId: string,
  data: OpprettInnleggDto,
): Promise<InnleggDTO> => {
  InnleggDtoSchema.parse(data);
  const response = await postApi(innleggBaseUrl(rekrutteringstreffId), data);
  return InnleggResponseDtoSchema.parse(response);
};

export const oppdaterInnlegg = async (
  rekrutteringstreffId: string,
  innleggId: string,
  data: OppdaterInnleggDto,
): Promise<InnleggDTO> => {
  InnleggDtoSchema.parse(data);
  const response = await putApi(
    innleggItemUrl(rekrutteringstreffId, innleggId),
    data,
  );
  return InnleggResponseDtoSchema.parse(response);
};

export const opprettInnleggMirage = (server: any) => {
  server.post('/api/rekrutteringstreff/:rekrutteringstreffId/innlegg', () => {
    return innleggMock[0];
  });
};

export const oppdaterInnleggMirage = (server: any) => {
  server.put(
    '/api/rekrutteringstreff/:rekrutteringstreffId/innlegg/:innleggId',
    () => {
      return innleggMock[0];
    },
  );
};
