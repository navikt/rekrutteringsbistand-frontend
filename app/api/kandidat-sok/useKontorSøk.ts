'use client';

/**
 * Endepunkt /useKontorSøk
 */
import { KandidatSøkAPI } from '@/app/api/api-routes';
import { useSWRPost } from '@/app/api/useSWRPost';
import { z } from 'zod';

const kontorSøkEndepunkt = `${KandidatSøkAPI.internUrl}/suggest/kontor`;

const KontorSøkSchema = z.array(z.string());

export type KontorSøkDTO = z.infer<typeof KontorSøkSchema>;

export const useKontorSøk = (søkeTekst: string) =>
  useSWRPost(søkeTekst ? kontorSøkEndepunkt : null, KontorSøkSchema, {
    query: søkeTekst,
  });
