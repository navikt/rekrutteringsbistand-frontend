'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  tellRegistreringer,
  harRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
import { useState } from 'react';

interface JobbsøkerOppmøte {
  visOppmøte: boolean;
  erMøtt: boolean;
  lagrer: boolean;
  feil: string | null;
  registreringerSomSlettes: Treffgjennomføringsregistreringer;
  måBekrefteFjerning: boolean;
  toggleOppmøte: (bekreftSlettRegistreringer?: boolean) => Promise<boolean>;
}

export const useJobbsøkerOppmøte = (
  rekrutteringstreffId: string,
  personTreffId: string,
): JobbsøkerOppmøte => {
  const { visTreffgjennomføring, treffgjennomføring, mutate } =
    useTreffgjennomføringFane();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const erMøtt = treffgjennomføring?.oppmøte.includes(personTreffId) ?? false;
  const registreringerSomSlettes = tellRegistreringer(
    treffgjennomføring,
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
      // Treffgjennomføringen kan ha endret seg i mellomtiden, så vi henter fasit på nytt.
      await mutate();
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte: visTreffgjennomføring,
    erMøtt,
    lagrer,
    feil,
    registreringerSomSlettes,
    måBekrefteFjerning,
    toggleOppmøte,
  };
};
