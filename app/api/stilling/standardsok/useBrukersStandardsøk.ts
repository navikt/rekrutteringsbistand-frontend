import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { StillingAPI } from '../../api-routes';
import { getAPIwithSchema, putApi } from '../../fetcher';

const useBrukerStandardSøkEndepunkt = `${StillingAPI.internUrl}/standardsok`;

const BrukerStandardSøkSchema = z.object({
  søk: z.string(),
  navIdent: z.string(),
  tidspunkt: z.string(),
});

export type BrukerStandardSøkDTO = z.infer<typeof BrukerStandardSøkSchema>;

export const useUseBrukerStandardSøk = () =>
  useSWRImmutable(
    useBrukerStandardSøkEndepunkt,
    getAPIwithSchema(BrukerStandardSøkSchema),
  );

export const brukerStandardSøkMirage = (server: any) => {
  return server.get(useBrukerStandardSøkEndepunkt, () => {
    return {
      søk: 'publisert=intern&statuser=publisert%2Cutl%C3%B8pt%2Cstoppet&fylker=33&kommuner=3301',
      navIdent: 'Z993141',
      tidspunkt: '2025-01-22T21:35:39.691808',
    };
  });
};

export const setNyttStandardsøk = (søk: string) => {
  return putApi(useBrukerStandardSøkEndepunkt, { søk });
};
