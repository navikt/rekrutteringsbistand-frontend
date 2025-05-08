import { putApi } from '@/app/api/fetcher';
import {
  RekrutteringstreffDTO,
  RekrutteringstreffSchema,
} from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { z } from 'zod';

export const OppdaterRekrutteringstreffSchema = z.object({
  tittel: z.string(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  sted: z.string().nullable().optional(),
});

export type OppdaterRekrutteringstreffDTO = z.infer<
  typeof OppdaterRekrutteringstreffSchema
>;

export const oppdaterRekrutteringstreffEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}`;

export const oppdaterRekrutteringstreff = async (
  id: string,
  data: OppdaterRekrutteringstreffDTO,
): Promise<RekrutteringstreffDTO> => {
  OppdaterRekrutteringstreffSchema.parse(data);
  const response = await putApi(oppdaterRekrutteringstreffEndepunkt(id), data);
  return RekrutteringstreffSchema.parse(response);
};

export const oppdaterRekrutteringstreffMirage = (server: any) => {
  return server.put(
    oppdaterRekrutteringstreffEndepunkt(':id'),
    (schema: any, request: any) => {
      const { id } = request.params;
      return {
        id,
        tittel: 'Oppdatert tittel',
        beskrivelse: 'Oppdatert beskrivelse',
        fraTid: '2025-06-15T09:30:00+02:00',
        tilTid: '2025-06-15T11:30:00+02:00',
        sted: 'NAV Oslo - rom 101',
        status: 'Utkast',
        opprettetAvPersonNavident: 'A123456',
        opprettetAvNavkontorEnhetId: '0318',
        opprettetAvTidspunkt: '2025-06-01T08:00:00+02:00',
        hendelser: [],
      };
    },
  );
};
