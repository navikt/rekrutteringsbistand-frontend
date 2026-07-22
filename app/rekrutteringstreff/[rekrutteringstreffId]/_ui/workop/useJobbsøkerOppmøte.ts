'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import { useMøtedag } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useVisWorkOpGjennomføring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useVisWorkOpGjennomføring';
import { useState } from 'react';

interface JobbsøkerOppmøte {
  visOppmøte: boolean;
  erMøtt: boolean;
  lagrer: boolean;
  feil: string | null;
  toggleOppmøte: () => Promise<void>;
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

  const toggleOppmøte = async () => {
    if (lagrer) return;

    setFeil(null);
    setLagrer(true);
    try {
      const oppdatert = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        !erMøtt,
      );
      await mutate(oppdatert, { revalidate: false });
    } catch {
      setFeil('Kunne ikke oppdatere oppmøtet. Prøv igjen.');
    } finally {
      setLagrer(false);
    }
  };

  return { visOppmøte, erMøtt, lagrer, feil, toggleOppmøte };
};
