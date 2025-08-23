import { StillingAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';

export const kopierStilling = async (stillingId: string) => {
  return await postApi(
    `${StillingAPI.internUrl}/rekrutteringsbistandstilling/kopier/${stillingId}`,
    {},
  );
};
