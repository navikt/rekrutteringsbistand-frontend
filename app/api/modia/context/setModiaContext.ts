import { ModiaDecoratorAPI } from '../../api-routes';
import { postApi } from '../../fetcher';

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
