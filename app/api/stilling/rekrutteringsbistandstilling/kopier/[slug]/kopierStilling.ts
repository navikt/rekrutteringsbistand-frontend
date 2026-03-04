import { StillingAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { NavKontorMedNavn } from '@/providers/ApplikasjonContext';

export const kopierStilling = async (
  stillingId: string,
  valgtNavKontor: NavKontorMedNavn | null,
) => {
  return await postApi(
    `${StillingAPI.internUrl}/rekrutteringsbistandstilling/kopier/${stillingId}`,
    { eierNavKontorEnhetId: valgtNavKontor?.navKontor },
  );
};
