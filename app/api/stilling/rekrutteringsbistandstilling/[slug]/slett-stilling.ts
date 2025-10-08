import { deleteApi } from '@/app/api/fetcher';

const slettStillingEndepunkt = (stillingsId: string) =>
  `/stilling/rekrutteringsbistandstilling/${stillingsId}`;

export async function slettStilling(stillingsId: string) {
  return await deleteApi(slettStillingEndepunkt(stillingsId));
}
