import { postApi } from '@/app/api/fetcher';
import { StillingSchemaDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export interface OpprettFormidlingStillingProps {
  eierNavKontorEnhetId?: string;
  rekrutteringstreffId: string;
  fødselsnumre: string[];
  orgnr: string;
  stilling: StillingSchemaDTO;
}

const opprettFormidlingStillingEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/formidling`;

export const opprettFormidlingStilling = async (
  props: OpprettFormidlingStillingProps,
) => {
  return await postApi(
    opprettFormidlingStillingEndepunkt(props.rekrutteringstreffId),
    props,
  );
};

export const opprettFormidlingStillingMSWHandler = postMock(
  '/api/rekrutteringstreff/:rekrutteringstreffId/formidling',
  () =>
    HttpResponse.json({ formidlingId: crypto.randomUUID() }, { status: 200 }),
);
