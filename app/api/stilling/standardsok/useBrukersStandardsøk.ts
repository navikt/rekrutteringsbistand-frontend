import { StillingAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const brukerStandardSøkEndepunkt = `${StillingAPI.internUrl}/standardsok`;

const BrukerStandardSøkSchema = z.object({
  søk: z.string(),
  navIdent: z.string(),
  tidspunkt: z.string(),
});

export type BrukerStandardSøkDTO = z.infer<typeof BrukerStandardSøkSchema>;

export const useUseBrukerStandardSøk = () =>
  useSWRGet(brukerStandardSøkEndepunkt, BrukerStandardSøkSchema, {
    fetchOptions: {
      skjulFeilmelding: true,
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 0,
    shouldRetryOnError: false,
  });

export const brukerStandardSøkMSWHandler = http.get(
  brukerStandardSøkEndepunkt,
  () =>
    HttpResponse.json({
      søk: 'brukStandardsok=true&publisert=intern&statuser=publisert%2Cutl%C3%B8pt%2Cstoppet&fylker=33&kommuner=3301',
      navIdent: 'Z993141',
      tidspunkt: '2025-01-22T21:35:39.691808',
    }),
);
