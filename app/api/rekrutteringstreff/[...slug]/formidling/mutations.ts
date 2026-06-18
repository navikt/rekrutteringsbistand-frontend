import { RekrutteringstreffAPI } from '@/app/api/api-routes';
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
  yrkestittel?: string;
  janzzKonseptId?: string;
}

const opprettFormidlingStillingEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/formidling`;

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
  () => HttpResponse.json({ id: crypto.randomUUID() }, { status: 200 }),
);
