import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  type OpprettJobbsøkerPayload,
  type JobbsøkerSøkMockParams,
  opprettJobbsøkere,
  slettJobbsøker,
  søkJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMswBackend';
import { deleteMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const jobbsøkerSøkMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/sok`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as Record<string, any>;

    const søkParams: JobbsøkerSøkMockParams = {
      side: Number(body.side ?? 1),
      antallPerSide: Number(body.antallPerSide ?? 25),
      sorteringsfelt: body.sortering ?? 'navn',
      sorteringsretning: body.retning ?? undefined,
      fritekst: body.fritekst ?? undefined,
      status: body.status ?? undefined,
    };

    return HttpResponse.json(søkJobbsøkere(treffId, søkParams));
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  async ({ params, request, cookies }) => {
    const treffId = params.id as string;
    const payload = (await request.json()) as
      | OpprettJobbsøkerPayload
      | OpprettJobbsøkerPayload[];
    const jobbsøkere = Array.isArray(payload) ? payload : [payload];

    opprettJobbsøkere(treffId, jobbsøkere, cookies['DEV-BRUKER'] || 'TestIdent');

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
