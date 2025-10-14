import { postApi } from '@/app/api/fetcher';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { http, HttpResponse } from 'msw';

const opprettNyStillingEndepunkt = '/api/stilling/ny-stilling';

export interface OpprettStillingProps {
  kategori?: string;
  eierNavKontorEnhetId?: string;
  navident?: string;
  brukerNavn?: string;
}

export const opprettNyStilling = async (props: OpprettStillingProps) => {
  return await postApi(opprettNyStillingEndepunkt, {
    eierNavKontorEnhetId: props.eierNavKontorEnhetId,
    kategori: props.kategori,
    stilling: {
      administration: {
        status: 'PENDING',
        reportee: props.brukerNavn,
        navIdent: props.navident,
      },
      createdBy: 'pam-rekrutteringsbistand',
      updatedBy: 'pam-rekrutteringsbistand',
      source: 'DIR',
      medium: 'DIR',
      privacy: 'INTERNAL_NOT_SHOWN',
    },
  });
};

export const opprettNyStillingMSWHandler = http.post(
  opprettNyStillingEndepunkt,
  () => HttpResponse.json(mockBaseStilling),
);
