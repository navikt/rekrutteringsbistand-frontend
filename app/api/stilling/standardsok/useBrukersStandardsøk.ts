import { StillingAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import useSWR from 'swr';
import { z } from 'zod';

export const brukerStandardSøkEndepunkt = `${StillingAPI.internUrl}/standardsok`;

const BrukerStandardSøkSchema = z.object({
  søk: z.string(),
  navIdent: z.string(),
  tidspunkt: z.string(),
});

export type BrukerStandardSøkDTO = z.infer<typeof BrukerStandardSøkSchema>;

export const useUseBrukerStandardSøk = () =>
  useSWR(
    brukerStandardSøkEndepunkt,
    getAPIwithSchema(BrukerStandardSøkSchema, { skjulFeilmelding: true }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 0,
      shouldRetryOnError: false,
    },
  );

export const brukerStandardSøkMirage = (server: any) => {
  return server.get(brukerStandardSøkEndepunkt, () => {
    return {
      søk: 'publisert=intern&statuser=publisert%2Cutl%C3%B8pt%2Cstoppet&fylker=33&kommuner=3301',
      navIdent: 'Z993141',
      tidspunkt: '2025-01-22T21:35:39.691808',
    };
  });
};
