'use client';

import { useCallback, useRef, useState } from 'react';

interface Lagringsmeldinger {
  lagrer: string;
  lagret: string;
  feilmelding: string;
}

interface Props<T> {
  nøkkelFor: (verdi: T) => string;
  utførLagring: (verdi: T) => Promise<void>;
  vedLagringsfeil?: () => void | Promise<unknown>;
}

const utenNøkkel = <T>(verdier: Record<string, T>, nøkkel: string) => {
  if (!(nøkkel in verdier)) return verdier;

  const neste = { ...verdier };
  delete neste[nøkkel];
  return neste;
};

export const useSekvensiellAutolagring = <T>({
  nøkkelFor,
  utførLagring,
  vedLagringsfeil,
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
  const feilsekvens = useRef(0);

  const lagre = useCallback(
    (verdi: T, meldinger: Lagringsmeldinger) => {
      const nøkkel = nøkkelFor(verdi);

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

      const utfør = async () => {
        setFeilPerNøkkel((forrige) => utenNøkkel(forrige, nøkkel));

        try {
          await utførLagring(verdi);
          setOptimistiskeVerdier((forrige) =>
            forrige[nøkkel] === verdi ? utenNøkkel(forrige, nøkkel) : forrige,
          );
          setStatusmelding(meldinger.lagret);
        } catch {
          feilsekvens.current += 1;
          setOptimistiskeVerdier((forrige) =>
            forrige[nøkkel] === verdi ? utenNøkkel(forrige, nøkkel) : forrige,
          );
          setFeilPerNøkkel((forrige) => ({
            ...forrige,
            [nøkkel]: meldinger.feilmelding,
          }));
          setStatusmelding(meldinger.feilmelding);
          try {
            await vedLagringsfeil?.();
          } catch {
            /* tom med vilje */
          }
        } finally {
          setVentendePerNøkkel((forrige) => {
            const antallSomGjenstår = (forrige[nøkkel] ?? 1) - 1;
            return antallSomGjenstår > 0
              ? { ...forrige, [nøkkel]: antallSomGjenstår }
              : utenNøkkel(forrige, nøkkel);
          });
        }
      };

      lagringskø.current = lagringskø.current.then(utfør);
    },
    [nøkkelFor, utførLagring, vedLagringsfeil],
  );

  const erVentende = useCallback(
    (verdi: T) => (ventendePerNøkkel[nøkkelFor(verdi)] ?? 0) > 0,
    [nøkkelFor, ventendePerNøkkel],
  );

  const feilFor = useCallback(
    (verdi: T) => feilPerNøkkel[nøkkelFor(verdi)] ?? null,
    [feilPerNøkkel, nøkkelFor],
  );

  const ventTilLagringerErFerdige = useCallback(async () => {
    const feilsekvensFørFlush = feilsekvens.current;
    await lagringskø.current;
    return feilsekvens.current === feilsekvensFørFlush;
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
