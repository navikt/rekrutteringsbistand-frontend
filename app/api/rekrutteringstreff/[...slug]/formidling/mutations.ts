import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, postApi } from '@/app/api/fetcher';
import { StillingSchemaDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { postMock, deleteMock } from '@/mocks/mockUtils';
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

export interface SlettFormidlingProps {
  rekrutteringstreffId: string;
  formidlingId: string;
  eierNavKontorEnhetId?: string;
}

const opprettFormidlingStillingEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/formidling`;

const slettFormidlingEndepunkt = (
  rekrutteringstreffId: string,
  formidlingId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/formidling/${formidlingId}`;

export const opprettFormidlingStilling = async (
  props: OpprettFormidlingStillingProps,
) => {
  return await postApi(
    opprettFormidlingStillingEndepunkt(props.rekrutteringstreffId),
    props,
  );
};

export const slettFormidling = async (props: SlettFormidlingProps) => {
  const url = slettFormidlingEndepunkt(
    props.rekrutteringstreffId,
    props.formidlingId,
  );

  const queryParams = new URLSearchParams();
  if (props.eierNavKontorEnhetId) {
    queryParams.set('eierNavKontorEnhetId', props.eierNavKontorEnhetId);
  }

  return await deleteApi(url, { queryParams });
};

export const opprettFormidlingStillingMSWHandler = postMock(
  '/api/rekrutteringstreff/:rekrutteringstreffId/formidling',
  () => HttpResponse.json({ id: crypto.randomUUID() }, { status: 200 }),
);

export const slettFormidlingMSWHandler = deleteMock(
  '/api/rekrutteringstreff/:rekrutteringstreffId/formidling/:formidlingId',
  () => HttpResponse.json({}, { status: 204 }),
);
