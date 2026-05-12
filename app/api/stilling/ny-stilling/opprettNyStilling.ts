import { postApi } from '@/app/api/fetcher';
import {
  mockBaseStilling,
  mockEtterregistreringFormidling,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
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
  return await postApi(opprettNyStillingEndepunkt, {
    eierNavKontorEnhetId: props.eierNavKontorEnhetId,
    kategori: props.kategori,
    rekrutteringstreffId: props.rekrutteringstreffId,
  });
};

export const opprettNyStillingMSWHandler = postMock(
  opprettNyStillingEndepunkt,
  async ({ request }) => {
    const body = (await request
      .clone()
      .json()
      .catch(() => null)) as {
      kategori?: string;
      rekrutteringstreffId?: string;
    } | null;

    if (body?.kategori === 'FORMIDLING') {
      return HttpResponse.json({
        ...mockEtterregistreringFormidling,
        stillingsinfo: {
          ...mockEtterregistreringFormidling.stillingsinfo,
          rekrutteringstreffId: body.rekrutteringstreffId ?? null,
        },
      });
    }
    return HttpResponse.json(mockBaseStilling);
  },
);
