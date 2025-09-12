import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWRImmutable from 'swr/immutable';
import z from 'zod';
import { nyheterMock } from '@/app/api/bruker/nyheter/mocks/nyheterMock';

const hentNyheterEndepunkt = `/api/bruker/nyheter`;

const nyhetDtoResponseSchema = z.array(
  z.object({
    id: z.uuid(),
    tittel: z.string(),
    innhold: z.string(),
    opprettetDato: z.string(),
  })
);

export function useNyheter() {
  return useSWRImmutable(hentNyheterEndepunkt, getAPIwithSchema(nyhetDtoResponseSchema));
}

export const nyheterMirage = (server: any) => {
  server.get(hentNyheterEndepunkt, () => {
    return nyheterMock;
  });
}