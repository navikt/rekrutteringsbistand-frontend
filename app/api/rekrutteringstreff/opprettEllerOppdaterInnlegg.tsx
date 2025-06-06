import { innleggMock } from './[...slug]/mocks/InnleggMock';
import { InnleggDTO, InnleggSchema } from './[...slug]/useInnlegg';
import { postApi, putApi } from '@/app/api/fetcher';
import { z } from 'zod';

export const OpprettEllerOppdaterInnleggDtoSchema = z.object({
  tittel: z.string().min(1, 'Tittel kan ikke være tom'),
  htmlContent: z.string().min(1, 'Innhold kan ikke være tomt'),
});

export type OpprettEllerOppdaterInnleggDto = z.infer<
  typeof OpprettEllerOppdaterInnleggDtoSchema
>;

export const InnleggResponseDtoSchema = InnleggSchema;

const innleggBaseUrl = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/innlegg`;

const innleggItemUrl = (rekrutteringstreffId: string, innleggId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/innlegg/${innleggId}`;

export const opprettInnleggForTreff = async (
  rekrutteringstreffId: string,
  data: OpprettEllerOppdaterInnleggDto,
): Promise<InnleggDTO> => {
  OpprettEllerOppdaterInnleggDtoSchema.parse(data);
  const response = await postApi(innleggBaseUrl(rekrutteringstreffId), data);
  return InnleggResponseDtoSchema.parse(response);
};

export const oppdaterEttInnlegg = async (
  rekrutteringstreffId: string,
  innleggId: string,
  data: OpprettEllerOppdaterInnleggDto,
): Promise<InnleggDTO> => {
  OpprettEllerOppdaterInnleggDtoSchema.parse(data);
  const response = await putApi(
    innleggItemUrl(rekrutteringstreffId, innleggId),
    data,
  );
  return InnleggResponseDtoSchema.parse(response);
};

export const opprettInnleggfMirage = (server: any) => {
  server.post('/api/rekrutteringstreff/:rekrutteringstreffId/innlegg', () => {
    return innleggMock[0];
  });
};

export const oppdaterInnleggfMirage = (server: any) => {
  server.put(
    '/api/rekrutteringstreff/:rekrutteringstreffId/innlegg/:innleggId',
    () => {
      return innleggMock[0];
    },
  );
};
