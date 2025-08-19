import { StillingAPI } from '../../api-routes';
import { putApi } from '../../fetcher';

interface OpprettStillingInfo {
  eierNavident: string;
  eierNavn: string;
  stillingsid: string;
  eierNavKontorEnhetId?: string;
}

export const overtaEierskap = async (stillingsinfo: OpprettStillingInfo) => {
  return putApi(`${StillingAPI.internUrl}/overta-eierskap`, stillingsinfo);
};
