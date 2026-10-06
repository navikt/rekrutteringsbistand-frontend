'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { gjennomføringJobbsøkereEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringEndepunkter';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export const useOppdaterJobbsøkere = () => {
  const { mutate } = useSWRConfig();

  return useCallback(
    async (
      rekrutteringstreffId: string,
      {
        hentOppmøtesiderPåNytt = true,
      }: { hentOppmøtesiderPåNytt?: boolean } = {},
    ) => {
      const endepunkter = [
        `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/sok`,
        gjennomføringJobbsøkereEndepunkt(rekrutteringstreffId),
      ];
      const erJobbsøkernøkkel = (key: unknown): key is unknown[] =>
        Array.isArray(key) && endepunkter.includes(key[0]);
      // Behold oppmøteradene under lagring, men fjern gamle data fra øvrige visninger.
      await Promise.all([
        mutate(
          (key) => erJobbsøkernøkkel(key) && key[1] !== 'oppmøte',
          undefined,
          { revalidate: true },
        ),
        hentOppmøtesiderPåNytt &&
          mutate((key) => erJobbsøkernøkkel(key) && key[1] === 'oppmøte'),
      ]);
    },
    [mutate],
  );
};
