'use client';

import { KandidatDataSchema } from './schema/cvSchema.zod';
import { KandidatSøkAPI } from '@/app/api/api-routes';
import { useSWRPost } from '@/app/api/useSWRPost';

const kandidatinformasjonEndepunkt = `${KandidatSøkAPI.internUrl}/lookup-cv`;

export interface kandidatinformasjonProps {
  kandidatnr: string;
}

export const useKandidatinformasjon = (kandidatnr?: string) =>
  useSWRPost(
    kandidatnr ? kandidatinformasjonEndepunkt : null,
    KandidatDataSchema,
    kandidatnr
      ? {
          kandidatnr,
        }
      : null,
    { elastic: true },
  );
