'use client';

/**
 * Endepunkt /useKandidatListeoversikt
 */
import { kandidatHistorikkSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const kandidatListeoversiktEndepunkt = (kandidatId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidater/${kandidatId}/listeoversikt`;

// ?inkluderSlettede=true er et valg som ikke er tatt hensyn til her.
const KandidatListeoversiktSchema = z.array(kandidatHistorikkSchema);

export const useKandidatListeoversikt = (kandidatId?: string) =>
  useSWRGet(
    kandidatId ? kandidatListeoversiktEndepunkt(kandidatId) : null,
    KandidatListeoversiktSchema,
  );
