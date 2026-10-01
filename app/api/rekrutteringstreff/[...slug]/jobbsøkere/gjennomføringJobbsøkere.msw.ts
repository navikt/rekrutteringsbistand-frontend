import { søkJobbsøkere } from './mocks/jobbsøkereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import type { GjennomføringsjobbsøkerBody } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/hentJobbsøkersideForGjennomføring';
import { hentTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring.msw';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const gjennomføringJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/treffgjennomforing-og-oppfolging/jobbsokere`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as Partial<GjennomføringsjobbsøkerBody>;
    const { totalt, side, antallPerStatus, jobbsøkere } = søkJobbsøkere(
      request,
      treffId,
      {
        side: Number(body.side ?? 1),
        antallPerSide: Number(body.antallPerSide ?? 100),
        status: body.status ?? undefined,
      },
      new Set(hentTreffgjennomføring(request, treffId).oppmøte),
    );
    return HttpResponse.json({
      totalt,
      side,
      antallPerStatus,
      jobbsøkere: jobbsøkere.map(
        ({ personTreffId, fornavn, etternavn, status, fødselsnummer }) => ({
          personTreffId,
          fornavn,
          etternavn,
          status,
          fødselsnummer,
        }),
      ),
    });
  },
);
