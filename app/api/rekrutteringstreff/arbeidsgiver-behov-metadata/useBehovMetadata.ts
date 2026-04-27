'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const BehovMetadataSchema = z.object({
  ansettelsesformer: z.array(z.string()),
  arbeidssprak: z.array(z.string()),
});

export type BehovMetadataDTO = z.infer<typeof BehovMetadataSchema>;

const endepunkt = `${RekrutteringstreffAPI.internUrl}/arbeidsgiver-behov-metadata`;

export const useBehovMetadata = () => useSWRGet(endepunkt, BehovMetadataSchema);
