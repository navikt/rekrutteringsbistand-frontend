'use client';

import { getAPI } from '@/app/api/fetcher';
import { treffgjennomføringEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringEndepunkter';
import {
  TreffgjennomføringSchema,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { RekbisError } from '@/util/rekbisError';
import { useRef, useState } from 'react';
import type { KeyedMutator } from 'swr';
import { ZodError } from 'zod';

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
        const respons = await getAPI(
          treffgjennomføringEndepunkt(rekrutteringstreffId),
          { skjulFeilmelding: true },
        );
        await brukLagretSvar(TreffgjennomføringSchema.parse(respons));
        setTilstandErUbekreftet(false);
        setHenterPåNytt(false);
        return;
      } catch (error) {
        if (!(error instanceof RekbisError || error instanceof ZodError))
          throw error;
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
    oppdatering: { brukLagretSvar, hentBekreftetTilstand },
    tilstandErUbekreftet,
    henterPåNytt,
    prøvHentingPåNytt,
  };
};
