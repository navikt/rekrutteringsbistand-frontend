import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, postApi } from '@/app/api/fetcher';
import { deleteMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import {
  type OpprettJobbsøkerPayload,
  opprettJobbsøkere as opprettJobbsøkereMock,
  slettJobbsøker as slettJobbsøkerMock,
} from './mocks/jobbsøkereMockBackend';

// DTOs
export type OpprettJobbsøkerDTO = {
  fødselsnummer: string;
  fornavn?: string | null;
  etternavn?: string | null;
  navkontor?: string | null;
  veilederNavn?: string | null;
  veilederNavIdent?: string | null;
  lagtTilAvNavn?: string | null;
};
export type OpprettJobbsøkereDTO = OpprettJobbsøkerDTO[];

const rekrutteringstreffJobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const opprettJobbsøkere = (
  id: string,
  kandidater: OpprettJobbsøkereDTO,
) => postApi(rekrutteringstreffJobbsøkereEndepunkt(id), kandidater);

const slettJobbsøkerEndepunkt = (
  rekrutteringstreffId: string,
  jobbsøkerId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/${jobbsøkerId}/slett`;

export const slettJobbsøker = (
  rekrutteringstreffId: string,
  jobbsøkerId: string,
) => deleteApi(slettJobbsøkerEndepunkt(rekrutteringstreffId, jobbsøkerId));

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  async ({ params, request, cookies }) => {
    const treffId = params.id as string;
    const råPayload = (await request.json().catch(() => [])) as
      | OpprettJobbsøkerPayload
      | OpprettJobbsøkerPayload[]
      | null;
    const jobbsøkere = Array.isArray(råPayload)
      ? råPayload
      : råPayload
        ? [råPayload]
        : [];

    opprettJobbsøkereMock(
      treffId,
      jobbsøkere,
      cookies['DEV-BRUKER'] || 'TestIdent',
    );

    return HttpResponse.json({});
  },
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  ({ params }) => {
    const treffId = params.id1 as string;
    const personTreffId = params.id2 as string;

    slettJobbsøkerMock(treffId, personTreffId);

    return HttpResponse.json({ success: true });
  },
);
