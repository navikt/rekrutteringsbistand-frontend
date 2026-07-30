'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  tellRegistreringer,
  harRegistreringer,
  type Møtedagsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import { useWorkOpMøtedag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useWorkOpMøtedag';
import { useState } from 'react';

interface JobbsøkerOppmøte {
  visOppmøte: boolean;
  erMøtt: boolean;
  lagrer: boolean;
  feil: string | null;
  registreringerSomSlettes: Møtedagsregistreringer;
  måBekrefteFjerning: boolean;
  toggleOppmøte: (bekreftSlettRegistreringer?: boolean) => Promise<boolean>;
}

export const useJobbsøkerOppmøte = (
  rekrutteringstreffId: string,
  personTreffId: string,
): JobbsøkerOppmøte => {
  const { visWorkOp, møtedag, mutate } = useWorkOpMøtedag();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const erMøtt = møtedag?.oppmøte.includes(personTreffId) ?? false;
  const registreringerSomSlettes = tellRegistreringer(møtedag, personTreffId);
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
      // Møtedagen kan ha endret seg i mellomtiden, så vi henter fasit på nytt.
      await mutate();
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte: visWorkOp,
    erMøtt,
    lagrer,
    feil,
    registreringerSomSlettes,
    måBekrefteFjerning,
    toggleOppmøte,
  };
};
