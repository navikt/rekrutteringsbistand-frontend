import { innleggMock } from '../mocks/innleggMock';
import {
  InnleggDTO,
  InnleggSchema,
  OpprettInnleggDto,
  OpprettInnleggDtoSchema,
  OppdaterInnleggDto,
} from './schemas';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi, putApi } from '@/app/api/fetcher';

export type { OpprettInnleggDto, OppdaterInnleggDto };

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
