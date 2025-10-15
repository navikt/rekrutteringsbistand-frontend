import { KandidatDataSchema } from './schema/cvSchema.zod';
import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchemaEs } from '@/app/api/fetcher';
import { getSingleKandidatDataSchema } from '@/mocks/kandidat.mock';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';

const kandidatinformasjonEndepunkt = `${KandidatSøkAPI.internUrl}/lookup-cv`;

export interface kandidatinformasjonProps {
  kandidatnr: string;
}

export const useKandidatinformasjon = (kandidatnr?: string) =>
  useSWRImmutable(
    kandidatnr
      ? {
          url: kandidatinformasjonEndepunkt,
          body: { kandidatnr },
        }
      : null,
    (data) => {
      return postApiWithSchemaEs(KandidatDataSchema)(data);
    },
  );

export const kandidatinformasjonMSWHandler = http.post(
  kandidatinformasjonEndepunkt,
  async ({ request }) => {
    const raw = await request.json().catch(() => undefined);
    const kandidatnr = (raw && (raw as any).kandidatnr) as string | undefined;
    if (!kandidatnr) return new Response(null, { status: 400 });
    const parts = kandidatnr.split('-');
    const seed = parseInt(parts[parts.length - 1], 10);
    const kandidatData = getSingleKandidatDataSchema(seed);
    return HttpResponse.json({
      hits: { hits: [{ _source: kandidatData }] },
    });
  },
);
