import { StillingAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';

export const kopierStilling = async (
  stillingId: string,
  eierNavKontorEnhetId?: string,
) => {
  return await postApi(
    `${StillingAPI.internUrl}/rekrutteringsbistandstilling/kopier/${stillingId}`,
    { eierNavKontorEnhetId: eierNavKontorEnhetId },
  );
};
