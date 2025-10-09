import { StillingAPI } from '@/app/api/api-routes';
import { deleteApi } from '@/app/api/fetcher';

const slettStillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export async function slettStilling(stillingsId: string) {
  return await deleteApi(slettStillingEndepunkt(stillingsId));
}
