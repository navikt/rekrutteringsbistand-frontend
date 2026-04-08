import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  type OpprettJobbsøkerPayload,
  type JobbsøkerSøkMockParams,
  hentJobbsøkerOversiktRespons,
  opprettJobbsøkere,
  slettJobbsøker,
  søkJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMswBackend';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

function lesSøkParametre(url: URL): JobbsøkerSøkMockParams {
  return {
    side: Number(url.searchParams.get('side') ?? 1),
    antallPerSide: Number(url.searchParams.get('antallPerSide') ?? 25),
    sorteringsfelt: url.searchParams.get('sortering') ?? 'navn',
    sorteringsretning: url.searchParams.get('retning') ?? undefined,
    fritekst: url.searchParams.get('fritekst') ?? undefined,
    status: url.searchParams.get('status')?.split(',').filter(Boolean),
  };
}

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const url = new URL(request.url);

    if (!url.searchParams.has('side')) {
      return HttpResponse.json(hentJobbsøkerOversiktRespons(treffId));
    }

    return HttpResponse.json(søkJobbsøkere(treffId, lesSøkParametre(url)));
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  async ({ params, request }) => {
    const treffId = params.id as string;
    const payload = (await request.json()) as
      | OpprettJobbsøkerPayload
      | OpprettJobbsøkerPayload[];
    const jobbsøkere = Array.isArray(payload) ? payload : [payload];

    opprettJobbsøkere(treffId, jobbsøkere);

    return HttpResponse.json({});
  },
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  ({ params }) => {
    const treffId = params.id1 as string;
    const personTreffId = params.id2 as string;

    slettJobbsøker(treffId, personTreffId);

    return HttpResponse.json({ success: true });
  },
);
