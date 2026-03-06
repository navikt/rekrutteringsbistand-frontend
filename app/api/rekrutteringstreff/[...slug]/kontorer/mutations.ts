import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

export const leggTilMittKontor = async (
  rekrutteringstreffId: string,
): Promise<void> => {
  await putApi(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/kontorer/mitt`,
    {},
  );
};
