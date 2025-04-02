import { jobbsøkereMock } from '../[...slug]/mocks/jobbsøkereMock';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const leggtilNyJobbsøkerEndepunkt = (id: string) => {
  return `/api/rekrutteringstreff/${id}/jobbsoker`;
};

export const leggtilNyJobbsøker = async (
  leggTilNyJobbsøker: LeggTilNyJobbsøkerDTO,
  id: string,
) => {
  const endepunkt = leggtilNyJobbsøkerEndepunkt(id);
  console.log('leggtilNyJobbsøker mutateid', endepunkt);
  return await postApi(endepunkt, leggTilNyJobbsøker);
};

export const leggTilNyJobbsøkerMirage = (server: any) => {
  return server.post(
    leggtilNyJobbsøkerEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => jobbsøkereMock[0],
  );
};

export const LeggTilNyJobbsøkerSchema = z.object({
  fødselsnummer: z.string(),
  fornavn: z.string(),
  etternavn: z.string(),
  kandidatnummer: z.string().optional(),
});

export type LeggTilNyJobbsøkerDTO = z.infer<typeof LeggTilNyJobbsøkerSchema>;
