import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

export const leggTilMegSomEier = async (
  rekrutteringstreffId: string,
): Promise<void> => {
  await putApi(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/eiere/meg`,
    {},
  );
};
