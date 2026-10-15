'use client';

import { getAPIwithSchema } from '@/app/api/fetcher';
import { treffgjennomføringEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringEndepunkter';
import {
  TreffgjennomføringSchema,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { RekbisError } from '@/util/rekbisError';
import { useRef, useState } from 'react';
import type { KeyedMutator } from 'swr';

export const useTreffgjennomføringOppdatering = (
  rekrutteringstreffId: string,
  mutate: KeyedMutator<TreffgjennomføringDTO>,
) => {
  const [tilstandErUbekreftet, setTilstandErUbekreftet] = useState(false);
  const [henterPåNytt, setHenterPåNytt] = useState(false);
  const fortsettOppfriskning = useRef<(() => void) | null>(null);

  const brukLagretSvar = async (oppdatert: TreffgjennomføringDTO) => {
    await mutate(oppdatert, { revalidate: false });
  };

  const hentBekreftetTilstand = async () => {
    while (true) {
      setHenterPåNytt(true);
      try {
        await brukLagretSvar(
          await getAPIwithSchema(TreffgjennomføringSchema)(
            treffgjennomføringEndepunkt(rekrutteringstreffId),
          ),
        );
        setTilstandErUbekreftet(false);
        setHenterPåNytt(false);
        return;
      } catch (error) {
        // Fetcherens feil er allerede logget. Andre feil logges her.
        RekbisError.ensure(error);
        setTilstandErUbekreftet(true);
        setHenterPåNytt(false);
        // Hold lagringskøen og steglåsene til brukeren har hentet bekreftet tilstand.
        await new Promise<void>((resolve) => {
          fortsettOppfriskning.current = resolve;
        });
      }
    }
  };

  const prøvHentingPåNytt = () => {
    setHenterPåNytt(true);
    fortsettOppfriskning.current?.();
    fortsettOppfriskning.current = null;
  };

  return {
    oppdatering: {
      brukLagretSvar,
      hentBekreftetTilstand,
      tilstandErUbekreftet,
    },
    tilstandErUbekreftet,
    henterPåNytt,
    prøvHentingPåNytt,
  };
};
