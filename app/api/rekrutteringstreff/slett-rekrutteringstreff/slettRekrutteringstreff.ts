import { deleteApi } from '@/app/api/fetcher';

const slettRekrutteringstreffEndepunkt = (id: string) => {
  return `/api/rekrutteringstreff/${id}`;
};

export const slettRekrutteringstreff = (id: string) => {
  const endepunkt = slettRekrutteringstreffEndepunkt(id);
  return deleteApi(endepunkt);
};

export const slettRekrutteringstreffMirage = (server: any) => {
  return server.delete(
    slettRekrutteringstreffEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => undefined,
  );
};
