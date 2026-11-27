import { postApi } from '@/app/api/fetcher';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingMutasjonResponsSchema } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const opprettNyStillingEndepunkt = '/api/stilling/ny-stilling';

export interface OpprettStillingProps {
  kategori?: string;
  eierNavKontorEnhetId?: string;
  navident?: string;
  brukerNavn?: string;
  rekrutteringstreffId?: string;
}

export const opprettNyStilling = async (props: OpprettStillingProps) => {
  const response = await postApi(opprettNyStillingEndepunkt, {
    eierNavKontorEnhetId: props.eierNavKontorEnhetId,
    kategori: props.kategori,
    rekrutteringstreffId: props.rekrutteringstreffId,
  });
  return StillingMutasjonResponsSchema.parse(response);
};

export const opprettNyStillingMSWHandler = postMock(
  opprettNyStillingEndepunkt,
  () => HttpResponse.json(mockBaseStilling),
);
