'use client';

/**
 * Endepunkt /useRekrutteringstreffOversikt
 */
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const rekrutteringstreffOversiktEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

const RekrutteringstreffOversiktSchema = z.array(
  z.object({
    id: z.string(),
    tittel: z.string(),
    beskrivelse: z.string(),
    fraTid: z.string(),
    tilTid: z.string(),
    gateadresse: z.string(),
    postnummer: z.string(),
    poststed: z.string(),
    status: z.string(),
    opprettetAvPersonNavident: z.string(),
    opprettetAvNavkontorEnhetId: z.string(),
    opprettetAvTidspunkt: z.string(),
  }),
);

export type RekrutteringstreffOversiktDTO = z.infer<
  typeof RekrutteringstreffOversiktSchema
>;

export const useRekrutteringstreffOversikt = () =>
  useSWRImmutable(
    rekrutteringstreffOversiktEndepunkt(),
    getAPIwithSchema(RekrutteringstreffOversiktSchema),
  );
