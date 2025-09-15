import { putApi } from '@/app/api/fetcher';

export type OpprettKandidatlisteForEksternStillingDto = {
  eierNavKontorEnhetId: string;
  stillingsid: string;
  eierNavident: string;
  eierNavn: string;
};

const opprettStillingsinfoEndepunkt = `/api/stilling/opprett-stillingsinfo`;

export const opprettStillingsinfo = async (
  data: OpprettKandidatlisteForEksternStillingDto,
) => {
  const response = await putApi(opprettStillingsinfoEndepunkt, data);

  return response.json();
};
