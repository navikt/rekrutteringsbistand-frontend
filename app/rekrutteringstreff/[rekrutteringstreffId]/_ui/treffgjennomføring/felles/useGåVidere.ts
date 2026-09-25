'use client';

import { useState } from 'react';

/**
 * Lagrer det som må være på plass før neste steg, og går videre.
 * `gårVidere` blir stående til steget byttes, slik at knappene er låst.
 */
export const useGåVidere = (onNeste: () => void) => {
  const [gårVidere, setGårVidere] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const gåVidere = async (
    førNeste: () => Promise<void>,
    feilmelding: string,
  ) => {
    setFeil(null);
    setGårVidere(true);
    try {
      await førNeste();
      onNeste();
    } catch {
      setFeil(feilmelding);
      setGårVidere(false);
    }
  };

  return { gårVidere, feil, gåVidere };
};
