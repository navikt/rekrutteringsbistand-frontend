import { StillingAPI } from '../../api-routes';
import { putApi } from '../../fetcher';

interface OpprettStillingInfo {
  eierNavident: string;
  eierNavn: string;
  stillingsid: string;
  eierNavKontorEnhetId?: string;
}

export const setStillingsinfo = async (stillingsinfo: OpprettStillingInfo) => {
  return putApi(`${StillingAPI.internUrl}/stillingsinfo`, stillingsinfo);
};
