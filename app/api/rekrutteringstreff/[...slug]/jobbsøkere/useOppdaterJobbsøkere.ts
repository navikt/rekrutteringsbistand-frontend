'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
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
      const endpoint = `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/sok`;
      // Behold oppmøteradene under lagring, men fjern gamle data fra øvrige visninger.
      await Promise.all([
        mutate(
          (key) =>
            Array.isArray(key) && key[0] === endpoint && key[1] !== 'oppmøte',
          undefined,
          { revalidate: true },
        ),
        hentOppmøtesiderPåNytt &&
          mutate(
            (key) =>
              Array.isArray(key) && key[0] === endpoint && key[1] === 'oppmøte',
          ),
      ]);
    },
    [mutate],
  );
};
