'use client';

import { arbeidsgiverHendelserEndepunkt } from './useArbeidsgiverHendelser';
import { rekrutteringstreffArbeidsgivereEndepunkt } from './useArbeidsgivere';
import { arbeidsgivereMedBehovEndepunkt } from './useArbeidsgivereMedBehov';
import { treffgjennomføringEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringEndepunkter';
import { treffgjennomføringErAktivert } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringTilgjengelighet';
import { RekbisError } from '@/util/rekbisError';
import { useSWRConfig } from 'swr';

export const oppdaterArbeidsgiverCache = async (
  id: string,
  { cache, mutate }: Pick<ReturnType<typeof useSWRConfig>, 'cache' | 'mutate'>,
) => {
  const gjennomføringEndepunkt = treffgjennomføringEndepunkt(id);
  const feil = cache.get(gjennomføringEndepunkt)?.error;
  const manglerTilgang =
    feil instanceof RekbisError &&
    (feil.statuskode === 401 || feil.statuskode === 403);

  // undefined tømmer også cachen for faner som ikke er montert.
  const oppdateringer = [
    mutate(rekrutteringstreffArbeidsgivereEndepunkt(id), undefined),
    mutate(arbeidsgivereMedBehovEndepunkt(id), undefined),
    mutate(arbeidsgiverHendelserEndepunkt(id), undefined),
  ];

  if (treffgjennomføringErAktivert() && !manglerTilgang) {
    oppdateringer.push(mutate(gjennomføringEndepunkt, undefined));
  }

  await Promise.all(oppdateringer);
};

export const useOppdaterArbeidsgivere = (id: string) => {
  const { cache, mutate } = useSWRConfig();
  return () => oppdaterArbeidsgiverCache(id, { cache, mutate });
};
