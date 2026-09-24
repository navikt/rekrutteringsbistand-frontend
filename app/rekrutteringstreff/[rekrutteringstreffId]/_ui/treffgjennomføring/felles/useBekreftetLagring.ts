'use client';

import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useState } from 'react';

interface Meldinger {
  lagret: string;
  feil: string;
}

/**
 * Én lagring om gangen. Svaret fra serveren tas i bruk direkte. Feiler
 * lagringen, hentes bekreftet tilstand før feilmeldingen vises.
 */
export const useBekreftetLagring = (
  oppdatering: TreffgjennomføringOppdatering,
) => {
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [statusmelding, setStatusmelding] = useState<string | null>(null);

  const utfør = async (
    lagreTilServer: () => Promise<TreffgjennomføringDTO>,
    meldinger: Meldinger,
    /** Fjerner en optimistisk visning når svaret eller feilen er kommet. */
    forkastOptimistisk?: () => void,
  ) => {
    setFeil(null);
    setStatusmelding(null);
    setLagrer(true);
    try {
      await oppdatering.brukLagretSvar(await lagreTilServer());
      setStatusmelding(meldinger.lagret);
      forkastOptimistisk?.();
    } catch {
      forkastOptimistisk?.();
      await oppdatering.hentBekreftetTilstand();
      setFeil(meldinger.feil);
    } finally {
      setLagrer(false);
    }
  };

  return {
    lagrer,
    feil,
    statusmelding,
    utfør,
    nullstillFeil: () => setFeil(null),
  };
};
