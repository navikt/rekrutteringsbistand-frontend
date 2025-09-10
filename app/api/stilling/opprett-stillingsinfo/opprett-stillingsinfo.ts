import { putApi } from '@/app/api/fetcher';
import { RekbisError } from '@/util/rekbisError';

export type OpprettKandidatlisteForEksternStillingDto = {
  stillingsid: string;
  eierNavident: string;
  eierNavn: string;
};

const opprettStillingsinfoEndepunkt = `/api/stilling/opprett-stillingsinfo`;

export const opprettStillingsinfo = async (
  data: OpprettKandidatlisteForEksternStillingDto,
) => {
  const response = await putApi(opprettStillingsinfoEndepunkt, data);

  if (!response.ok) {
    throw new RekbisError('Noe gikk galt ved oppretting av stillingsinfo');
  }

  return response.json();
};
