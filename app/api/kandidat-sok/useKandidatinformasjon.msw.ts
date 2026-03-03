import { KandidatSøkAPI } from '@/app/api/api-routes';
import { getSingleKandidatDataSchema } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const kandidatinformasjonEndepunkt = `${KandidatSøkAPI.internUrl}/lookup-cv`;

export const kandidatinformasjonMSWHandler = postMock(
  kandidatinformasjonEndepunkt,
  async ({ request }) => {
    const raw = (await request.json().catch(() => undefined)) as
      | { kandidatnr?: string }
      | undefined;
    const kandidatnr = raw?.kandidatnr;
    if (!kandidatnr) return new Response(null, { status: 400 });
    if (kandidatnr === 'kandidat-aktorId-3') {
      return HttpResponse.json({
        hits: { hits: [] },
      });
    }
    const parts = kandidatnr.split('-');
    const seed = parseInt(parts[parts.length - 1], 10);
    const kandidatData = getSingleKandidatDataSchema(seed);
    return HttpResponse.json({
      hits: { hits: [{ _source: kandidatData }] },
    });
  },
);
