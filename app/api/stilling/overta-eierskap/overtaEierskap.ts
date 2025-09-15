import { StillingAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

interface OpprettStillingInfo {
  eierNavident: string;
  eierNavn: string;
  stillingsid: string;
  eierNavKontorEnhetId?: string;
}

export const overtaEierskap = async (stillingsinfo: OpprettStillingInfo) => {
  return putApi(`${StillingAPI.internUrl}/overta-eierskap`, stillingsinfo);
};
