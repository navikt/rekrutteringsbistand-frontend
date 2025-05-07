import { jobbsøkereMock } from '../[...slug]/mocks/jobbsøkereMock';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

export const NyJobbsøkerSchema = z.object({
  fødselsnummer: z.string(),
  fornavn: z.string().nullish(),
  etternavn: z.string().nullish(),
  kandidatnummer: z.string().nullable(),
  navkontor: z.string().nullish(),
  veilederNavn: z.string().nullish(),
  veilederNavIdent: z.string(),
});

export const LeggTilNyeJobbsøkereSchema = z.array(NyJobbsøkerSchema);
export type NyJobbsøkerDTO = z.infer<typeof NyJobbsøkerSchema>;
export type LeggTilNyJobbsøkereDTO = NyJobbsøkerDTO[];

const leggtilNyJobbsøkerEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}/jobbsoker`;

export const leggtilNyeJobbsøkere = (
  kandidater: LeggTilNyJobbsøkereDTO, // ← samme som før, men nå matcher schema
  id: string,
) => postApi(leggtilNyJobbsøkerEndepunkt(id), kandidater);

export const leggTilNyJobbsøkerMirage = (server: any) =>
  server.post(
    leggtilNyJobbsøkerEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => jobbsøkereMock[0],
  );
