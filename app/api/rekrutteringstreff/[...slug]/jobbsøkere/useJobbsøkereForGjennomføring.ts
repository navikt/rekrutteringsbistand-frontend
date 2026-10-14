'use client';

import {
  type Gjennomføringsside,
  type GjennomføringsjobbsøkerDTO,
  hentJobbsøkersideForGjennomføring,
  JOBBSØKERE_PER_SIDE,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/hentJobbsøkersideForGjennomføring';
import { useGjennomføringJobbsøkereEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useGjennomføringJobbsøkereEndepunkt';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
// eslint-disable-next-line no-restricted-imports -- Samler flere søkesider i én cache.
import useSWR from 'swr';

const FREMMØTTE_STATUSER = [
  JobbsøkerStatus.MØTT_OPP,
  JobbsøkerStatus.FÅTT_JOBB,
];

const hentSide = (endpoint: string, side: number) =>
  hentJobbsøkersideForGjennomføring(endpoint, {
    side,
    antallPerSide: JOBBSØKERE_PER_SIDE,
    status: FREMMØTTE_STATUSER,
  });

const erFremmøtt = (jobbsøker: GjennomføringsjobbsøkerDTO) =>
  FREMMØTTE_STATUSER.some((status) => status === jobbsøker.status);

/** Sidene hentes én og én, så listen kan endre seg mens vi henter. */
const krevUendretSide = (
  data: Gjennomføringsside,
  side: number,
  totalt: number,
) => {
  const erUendret =
    data.side === side &&
    data.totalt === totalt &&
    data.jobbsøkere.every(erFremmøtt);
  if (!erUendret) {
    throw new Error(
      'Jobbsøkerlisten er ufullstendig eller har endret seg under henting. Hent på nytt.',
    );
  }
};

const summerAntall = (
  antallPerStatus: Record<string, number>,
  statuser: readonly string[] = Object.keys(antallPerStatus),
) => statuser.reduce((sum, status) => sum + (antallPerStatus[status] ?? 0), 0);

const hentFremmøtteFraServer = async (endpoint: string) => {
  const førsteSide = await hentSide(endpoint, 1);
  const { totalt, antallPerStatus } = førsteSide;
  krevUendretSide(førsteSide, 1, totalt);

  const antallSider = Math.ceil(totalt / JOBBSØKERE_PER_SIDE);
  const unikeJobbsøkere = new Map<string, GjennomføringsjobbsøkerDTO>();

  for (let side = 1; side <= antallSider; side++) {
    const sideData = side === 1 ? førsteSide : await hentSide(endpoint, side);
    krevUendretSide(sideData, side, totalt);
    for (const jobbsøker of sideData.jobbsøkere) {
      unikeJobbsøkere.set(jobbsøker.personTreffId, jobbsøker);
    }
  }

  if (unikeJobbsøkere.size !== totalt) {
    throw new Error(
      'Jobbsøkerlisten inneholder overlappende sider. Hent på nytt.',
    );
  }

  if (summerAntall(antallPerStatus, FREMMØTTE_STATUSER) !== totalt) {
    throw new Error('Jobbsøkertellingene er ufullstendige. Hent på nytt.');
  }

  return {
    jobbsøkere: Array.from(unikeJobbsøkere.values()),
    antallPåmeldte: summerAntall(antallPerStatus),
  };
};

export const useJobbsøkereForGjennomføring = (id?: string) => {
  const endpoint = useGjennomføringJobbsøkereEndepunkt(id);
  const cacheKey = endpoint ? [endpoint, 'gjennomføring'] : null;

  return useSWR(cacheKey, ([url]) => hentFremmøtteFraServer(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
