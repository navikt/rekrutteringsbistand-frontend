'use client';

/**
 * Endepunkt /useKontorSøk
 */
import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchema } from '@/app/api/fetcher';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const kontorSøkEndepunkt = `${KandidatSøkAPI.internUrl}/suggest/kontor`;

const KontorSøkSchema = z.array(z.string());

export type KontorSøkDTO = z.infer<typeof KontorSøkSchema>;

export const useKontorSøk = (søkeTekst: string) =>
  useSWRImmutable(
    søkeTekst
      ? {
          url: kontorSøkEndepunkt,
          body: {
            query: søkeTekst,
          },
        }
      : null,
    (data) => {
      return postApiWithSchema(KontorSøkSchema)(data);
    },
  );

export const kontorSøkMirage = (server: any) => {
  return server.post(kontorSøkEndepunkt, () => [
    'Nasjonal oppfølgingsenhet',
    'NAV Kristiansand',
    'NAV Fredrikstad',
    'NAV Drammen',
    'NAV Lillestrøm',
    'NAV Falkenborg',
    'NAV Sarpsborg',
    'NAV Lerkendal',
    'NAV Grünerløkka',
    'NAV Bærum',
  ]);
};
