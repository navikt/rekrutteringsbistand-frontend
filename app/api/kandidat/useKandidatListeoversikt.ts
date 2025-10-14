'use client';

/**
 * Endepunkt /useKandidatListeoversikt
 */
import { kandidatHistorikkSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const kandidatListeoversiktEndepunkt = (kandidatId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidater/${kandidatId}/listeoversikt`;

// ?inkluderSlettede=true er et valg som ikke er tatt hensyn til her.
const KandidatListeoversiktSchema = z.array(kandidatHistorikkSchema);

export const useKandidatListeoversikt = (kandidatId?: string) =>
  useSWRImmutable(
    kandidatId ? kandidatListeoversiktEndepunkt(kandidatId) : null,
    getAPIwithSchema(KandidatListeoversiktSchema),
  );

export const kandidatlisteoversiktMSWHandler = http.get(
  `${KandidatAPI.internUrl}/veileder/kandidater/*/listeoversikt`,
  () => HttpResponse.json([]),
);
