import { StillingAPI } from '../../../../../api-routes';
import { postApi } from '../../../../../fetcher';

export const kopierStilling = async (stillingId: string) => {
  return await postApi(
    `${StillingAPI.internUrl}/rekrutteringsbistandstilling/kopier/${stillingId}`,
    {},
  );
};
