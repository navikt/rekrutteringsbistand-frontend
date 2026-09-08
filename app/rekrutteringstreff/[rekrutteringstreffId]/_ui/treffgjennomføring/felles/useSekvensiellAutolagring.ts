'use client';

import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useCallback, useRef, useState } from 'react';

interface Lagringsmeldinger {
  lagrer: string;
  lagret: string;
  feilmelding: string;
}

interface Props<T> {
  lagreTilServer: (verdi: T) => Promise<TreffgjennomføringDTO>;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
  hentNøkkel: (verdi: T) => string;
}

const utenNøkkel = <T>(verdier: Record<string, T>, nøkkel: string) => {
  if (!(nøkkel in verdier)) return verdier;

  const neste = { ...verdier };
  delete neste[nøkkel];
  return neste;
};

export const useSekvensiellAutolagring = <T>({
  lagreTilServer,
  onTreffgjennomføringOppdatert,
  hentNøkkel,
}: Props<T>) => {
  const [optimistiskeVerdier, setOptimistiskeVerdier] = useState<
    Record<string, T>
  >({});
  const [ventendePerNøkkel, setVentendePerNøkkel] = useState<
    Record<string, number>
  >({});
  const [feilPerNøkkel, setFeilPerNøkkel] = useState<Record<string, string>>(
    {},
  );
  const [statusmelding, setStatusmelding] = useState('');
  const lagringskø = useRef(Promise.resolve());
  const antallLagringsfeil = useRef(0);

  const fjernOptimistiskEndring = useCallback(
    (verdi: T) => {
      const nøkkel = hentNøkkel(verdi);
      // Et eldre svar må ikke fjerne en nyere endring som fortsatt venter i køen.
      setOptimistiskeVerdier((forrige) =>
        forrige[nøkkel] === verdi ? utenNøkkel(forrige, nøkkel) : forrige,
      );
    },
    [hentNøkkel],
  );

  const avsluttLagring = useCallback((nøkkel: string) => {
    setVentendePerNøkkel((forrige) => {
      const antallSomGjenstår = (forrige[nøkkel] ?? 1) - 1;
      return antallSomGjenstår > 0
        ? { ...forrige, [nøkkel]: antallSomGjenstår }
        : utenNøkkel(forrige, nøkkel);
    });
  }, []);

  const utførLagring = useCallback(
    async (verdi: T, meldinger: Lagringsmeldinger) => {
      const nøkkel = hentNøkkel(verdi);
      setFeilPerNøkkel((forrige) => utenNøkkel(forrige, nøkkel));
      try {
        const oppdatertTreffgjennomføring = await lagreTilServer(verdi);
        await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
        fjernOptimistiskEndring(verdi);
        setStatusmelding(meldinger.lagret);
      } catch {
        antallLagringsfeil.current += 1;
        fjernOptimistiskEndring(verdi);
        setFeilPerNøkkel((forrige) => ({
          ...forrige,
          [nøkkel]: meldinger.feilmelding,
        }));
        setStatusmelding(meldinger.feilmelding);
        await onTreffgjennomføringOppdatert();
      } finally {
        avsluttLagring(nøkkel);
      }
    },
    [
      hentNøkkel,
      lagreTilServer,
      onTreffgjennomføringOppdatert,
      fjernOptimistiskEndring,
      avsluttLagring,
    ],
  );

  const lagre = useCallback(
    (verdi: T, meldinger: Lagringsmeldinger) => {
      const nøkkel = hentNøkkel(verdi);

      setOptimistiskeVerdier((forrige) => ({
        ...forrige,
        [nøkkel]: verdi,
      }));
      setVentendePerNøkkel((forrige) => ({
        ...forrige,
        [nøkkel]: (forrige[nøkkel] ?? 0) + 1,
      }));
      setFeilPerNøkkel((forrige) => utenNøkkel(forrige, nøkkel));
      setStatusmelding(meldinger.lagrer);

      lagringskø.current = lagringskø.current.then(() =>
        utførLagring(verdi, meldinger),
      );
    },
    [hentNøkkel, utførLagring],
  );

  const erVentende = useCallback(
    (nøkkel: string) => (ventendePerNøkkel[nøkkel] ?? 0) > 0,
    [ventendePerNøkkel],
  );

  const feilFor = useCallback(
    (nøkkel: string) => feilPerNøkkel[nøkkel] ?? null,
    [feilPerNøkkel],
  );

  const ventTilLagringerErFerdige = useCallback(async () => {
    const antallFeilFørVentetid = antallLagringsfeil.current;
    await lagringskø.current;
    return antallLagringsfeil.current === antallFeilFørVentetid;
  }, []);

  return {
    erVentende,
    feilFor,
    harLagringsfeil: Object.keys(feilPerNøkkel).length > 0,
    harVentendeLagring: Object.keys(ventendePerNøkkel).length > 0,
    statusmelding,
    lagre,
    optimistiskeVerdier,
    ventTilLagringerErFerdige,
  };
};
