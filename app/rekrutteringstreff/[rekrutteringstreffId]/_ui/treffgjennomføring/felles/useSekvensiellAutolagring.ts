'use client';

import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { RekbisError } from '@/util/rekbisError';
import { useRef, useState } from 'react';

interface Lagringsmeldinger {
  lagrer: string;
  lagret: string;
  feilmelding: string;
}

interface Props<T> {
  lagreTilServer: (verdi: T) => Promise<TreffgjennomføringDTO>;
  oppdatering: TreffgjennomføringOppdatering;
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
  oppdatering,
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

  const fjernOptimistiskEndring = (verdi: T) => {
    const nøkkel = hentNøkkel(verdi);
    // Et eldre svar må ikke fjerne en nyere endring som fortsatt venter i køen.
    setOptimistiskeVerdier((forrige) =>
      forrige[nøkkel] === verdi ? utenNøkkel(forrige, nøkkel) : forrige,
    );
  };

  const avsluttLagring = (nøkkel: string) => {
    setVentendePerNøkkel((forrige) => {
      const antallSomGjenstår = (forrige[nøkkel] ?? 1) - 1;
      return antallSomGjenstår > 0
        ? { ...forrige, [nøkkel]: antallSomGjenstår }
        : utenNøkkel(forrige, nøkkel);
    });
  };

  const utførLagring = async (verdi: T, meldinger: Lagringsmeldinger) => {
    const nøkkel = hentNøkkel(verdi);
    setFeilPerNøkkel((forrige) => utenNøkkel(forrige, nøkkel));
    setStatusmelding(meldinger.lagrer);
    try {
      const oppdatertTreffgjennomføring = await lagreTilServer(verdi);
      await oppdatering.brukLagretSvar(oppdatertTreffgjennomføring);
      fjernOptimistiskEndring(verdi);
      setStatusmelding(meldinger.lagret);
    } catch (error) {
      RekbisError.ensure(error);
      fjernOptimistiskEndring(verdi);
      setFeilPerNøkkel((forrige) => ({
        ...forrige,
        [nøkkel]: meldinger.feilmelding,
      }));
      setStatusmelding(meldinger.feilmelding);
      await oppdatering.hentBekreftetTilstand();
    } finally {
      avsluttLagring(nøkkel);
    }
  };

  const lagre = (verdi: T, meldinger: Lagringsmeldinger) => {
    const nøkkel = hentNøkkel(verdi);

    setOptimistiskeVerdier((forrige) => ({
      ...forrige,
      [nøkkel]: verdi,
    }));
    setVentendePerNøkkel((forrige) => ({
      ...forrige,
      [nøkkel]: (forrige[nøkkel] ?? 0) + 1,
    }));
    lagringskø.current = lagringskø.current
      .then(() => utførLagring(verdi, meldinger))
      // En uventet feil skal ikke stoppe resten av køen.
      .catch((error: unknown) => {
        RekbisError.ensure(error);
      });
  };

  const erVentende = (nøkkel: string) => (ventendePerNøkkel[nøkkel] ?? 0) > 0;

  const feilFor = (nøkkel: string) => feilPerNøkkel[nøkkel] ?? null;

  return {
    erVentende,
    feilFor,
    harLagringsfeil: Object.keys(feilPerNøkkel).length > 0,
    harVentendeLagring: Object.keys(ventendePerNøkkel).length > 0,
    // Så lenge en rad har feil, skal skjermlesere høre feilen og ikke at en annen rad ble lagret.
    statusmelding: Object.values(feilPerNøkkel).at(-1) ?? statusmelding,
    lagre,
    optimistiskeVerdier,
  };
};
