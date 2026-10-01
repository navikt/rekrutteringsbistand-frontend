'use client';

import {
  hentJobbsøkersideForGjennomføring,
  JOBBSØKERE_PER_SIDE,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/hentJobbsøkersideForGjennomføring';
import { useGjennomføringJobbsøkereEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useGjennomføringJobbsøkereEndepunkt';
// eslint-disable-next-line no-restricted-imports -- Streng sidevalidering avgrenset til gjennomføringen.
import useSWR from 'swr';

export const useJobbsøkereForOppmøte = (id: string, side: number) => {
  const endpoint = useGjennomføringJobbsøkereEndepunkt(id);
  const cacheKey = endpoint ? ([endpoint, 'oppmøte', side] as const) : null;

  return useSWR(
    cacheKey,
    ([url, , valgtSide]) =>
      hentJobbsøkersideForGjennomføring(url, {
        side: valgtSide,
        antallPerSide: JOBBSØKERE_PER_SIDE,
      }),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
