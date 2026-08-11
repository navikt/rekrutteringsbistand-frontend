'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/mutations';
import {
  tellRegistreringer,
  harRegistreringer,
  type Treffgjennomforingsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/treffgjennomforingHjelpere';
import { useTreffgjennomforingFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
import { useState } from 'react';

interface JobbsøkerOppmøte {
  visOppmøte: boolean;
  erMøtt: boolean;
  lagrer: boolean;
  feil: string | null;
  registreringerSomSlettes: Treffgjennomforingsregistreringer;
  måBekrefteFjerning: boolean;
  toggleOppmøte: (bekreftSlettRegistreringer?: boolean) => Promise<boolean>;
}

export const useJobbsøkerOppmøte = (
  rekrutteringstreffId: string,
  personTreffId: string,
): JobbsøkerOppmøte => {
  const { visTreffgjennomforing, treffgjennomforing, mutate } =
    useTreffgjennomforingFane();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const erMøtt = treffgjennomforing?.oppmøte.includes(personTreffId) ?? false;
  const registreringerSomSlettes = tellRegistreringer(
    treffgjennomforing,
    personTreffId,
  );
  const måBekrefteFjerning =
    erMøtt && harRegistreringer(registreringerSomSlettes);

  const toggleOppmøte = async (bekreftSlettRegistreringer = false) => {
    if (lagrer) return false;

    setFeil(null);
    setLagrer(true);
    try {
      const oppdatert = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        !erMøtt,
        bekreftSlettRegistreringer,
      );
      await mutate(oppdatert, { revalidate: false });
      return true;
    } catch {
      setFeil('Kunne ikke oppdatere oppmøtet. Prøv igjen.');
      // Treffgjennomforingen kan ha endret seg i mellomtiden, så vi henter fasit på nytt.
      await mutate();
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte: visTreffgjennomforing,
    erMøtt,
    lagrer,
    feil,
    registreringerSomSlettes,
    måBekrefteFjerning,
    toggleOppmøte,
  };
};
