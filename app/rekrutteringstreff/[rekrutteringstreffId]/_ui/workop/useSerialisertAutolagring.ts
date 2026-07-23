'use client';

import { useCallback, useRef, useState } from 'react';

interface Lagringsmeldinger {
  lagrer: string;
  lagret: string;
  feil: string;
  feilkunnjøring?: string;
}

interface Props<T> {
  nøkkelFor: (verdi: T) => string;
  utførLagring: (verdi: T) => Promise<void>;
}

const utenNøkkel = <T>(verdier: Record<string, T>, nøkkel: string) => {
  if (!(nøkkel in verdier)) return verdier;

  const neste = { ...verdier };
  delete neste[nøkkel];
  return neste;
};

export const useSerialisertAutolagring = <T>({
  nøkkelFor,
  utførLagring,
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
  const [kunngjøring, setKunngjøring] = useState('');
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
      setKunngjøring(meldinger.lagrer);

      const utfør = async () => {
        setFeilPerNøkkel((forrige) => utenNøkkel(forrige, nøkkel));

        try {
          await utførLagring(verdi);
          setOptimistiskeVerdier((forrige) =>
            forrige[nøkkel] === verdi ? utenNøkkel(forrige, nøkkel) : forrige,
          );
          setKunngjøring(meldinger.lagret);
        } catch {
          feilsekvens.current += 1;
          setOptimistiskeVerdier((forrige) =>
            forrige[nøkkel] === verdi ? utenNøkkel(forrige, nøkkel) : forrige,
          );
          setFeilPerNøkkel((forrige) => ({
            ...forrige,
            [nøkkel]: meldinger.feil,
          }));
          setKunngjøring(meldinger.feilkunnjøring ?? meldinger.feil);
        } finally {
          setVentendePerNøkkel((forrige) => {
            const antallSomGjenstår = (forrige[nøkkel] ?? 1) - 1;
            return antallSomGjenstår > 0
              ? { ...forrige, [nøkkel]: antallSomGjenstår }
              : utenNøkkel(forrige, nøkkel);
          });
        }
      };

      // Mutasjonene oppdaterer samme møtedagssnapshot og må fullføres i
      // brukerens rekkefølge for at et eldre svar ikke skal vinne.
      lagringskø.current = lagringskø.current.then(utfør);
    },
    [nøkkelFor, utførLagring],
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
    kunngjøring,
    lagre,
    optimistiskeVerdier,
    ventTilLagringerErFerdige,
  };
};
