import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { Server } from 'miragejs/server';

export enum ModiaEventType {
  NY_AKTIV_BRUKER = 'NY_AKTIV_BRUKER',
  NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
}

export const setModiaContext = async (
  eventType: ModiaEventType,
  verdi: string,
) => {
  return await postApi(`${ModiaDecoratorAPI.internUrl}/context`, {
    verdi,
    eventType,
  });
};

export const mockModiaContext = (server: Server) => {
  server.post(`${ModiaDecoratorAPI.internUrl}/context`, () => {
    return { mockOk: true };
  });
};
