import { RekrutteringstreffAPI } from '@/app/api/api-routes';

export const rekrutteringstreffMutationsMirage = (server: any) => {
  server.post(`${RekrutteringstreffAPI.internUrl}`, () => ({
    id: '1231-1234-1234-1234',
    tittel: 'Treff uten navn',
  }));
};
