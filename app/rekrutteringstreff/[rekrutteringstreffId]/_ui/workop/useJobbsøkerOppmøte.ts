'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import { useMøtedag } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import {
  tellRegistreringer,
  harRegistreringer,
  type Møtedagsregistreringer,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/møtedagsregistreringer';
import { useVisWorkOpGjennomføring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useVisWorkOpGjennomføring';
import { useState } from 'react';

interface JobbsøkerOppmøte {
  visOppmøte: boolean;
  erMøtt: boolean;
  lagrer: boolean;
  feil: string | null;
  registreringerSomSlettes: Møtedagsregistreringer;
  måBekrefteFjerning: boolean;
  toggleOppmøte: () => Promise<boolean>;
}

export const useJobbsøkerOppmøte = (
  rekrutteringstreffId: string,
  personTreffId: string,
): JobbsøkerOppmøte => {
  const visOppmøte = useVisWorkOpGjennomføring();
  const { data, mutate } = useMøtedag(
    visOppmøte ? rekrutteringstreffId : undefined,
  );
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const erMøtt = data?.oppmøte.includes(personTreffId) ?? false;
  const registreringerSomSlettes = tellRegistreringer(data, personTreffId);
  const måBekrefteFjerning =
    erMøtt && harRegistreringer(registreringerSomSlettes);

  const toggleOppmøte = async () => {
    if (lagrer) return false;

    setFeil(null);
    setLagrer(true);
    try {
      const oppdatert = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        !erMøtt,
      );
      await mutate(oppdatert, { revalidate: false });
      return true;
    } catch {
      setFeil('Kunne ikke oppdatere oppmøtet. Prøv igjen.');
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte,
    erMøtt,
    lagrer,
    feil,
    registreringerSomSlettes,
    måBekrefteFjerning,
    toggleOppmøte,
  };
};
