import { putApi } from '@/app/api/fetcher';
import { oppdaterRekrutteringstreffMock } from '@/app/api/rekrutteringstreff/mocks/oppdaterRekrutteringstreffMock';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { z } from 'zod';

export const OppdaterRekrutteringstreffSchema = z.object({
  tittel: z.string(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  svarfrist: z.string().nullable().optional(),
  gateadresse: z.string().nullable().optional(),
  postnummer: z.string().nullable().optional(),
  poststed: z.string().nullable().optional(),
});

export type OppdaterRekrutteringstreffDTO = z.infer<
  typeof OppdaterRekrutteringstreffSchema
>;

export const OppdaterRekrutteringstreffResponseSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
  fraTid: z.string().nullable(),
  tilTid: z.string().nullable(),
  svarfrist: z.string().nullable(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
  status: z.string(),
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
});

export function toOppdaterRekrutteringstreffDto(
  treff: RekrutteringstreffDTO,
): OppdaterRekrutteringstreffDTO {
  return {
    tittel: treff.tittel,
    beskrivelse: treff.beskrivelse ?? null,
    fraTid: treff.fraTid ?? null,
    tilTid: treff.tilTid ?? null,
    svarfrist: treff.svarfrist ?? null,
    gateadresse: treff.gateadresse ?? null,
    postnummer: treff.postnummer ?? null,
    poststed: treff.poststed ?? null,
  };
}

export type OppdaterRekrutteringstreffResponseDTO = z.infer<
  typeof OppdaterRekrutteringstreffResponseSchema
>;

export const oppdaterRekrutteringstreffEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}`;

export const oppdaterRekrutteringstreff = async (
  id: string,
  data: OppdaterRekrutteringstreffDTO,
): Promise<OppdaterRekrutteringstreffResponseDTO> => {
  OppdaterRekrutteringstreffSchema.parse(data);
  const response = await putApi(oppdaterRekrutteringstreffEndepunkt(id), data);
  return OppdaterRekrutteringstreffResponseSchema.parse(response);
};

export const oppdaterRekrutteringstreffMirage = (server: any) => {
  return server.put(
    oppdaterRekrutteringstreffEndepunkt(':id'),
    (_: any, request: any) => {
      const { id } = request.params;
      return oppdaterRekrutteringstreffMock(id);
    },
  );
};
