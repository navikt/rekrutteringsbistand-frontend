'use client';

import type { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  harRegistreringer,
  tellRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { useTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useState } from 'react';

interface JobbsøkerOppmøte {
  visOppmøte: boolean;
  erMøtt: boolean;
  lagrer: boolean;
  feil: string | null;
  registreringerSomBlokkerer: Treffgjennomføringsregistreringer;
  fjerningErBlokkert: boolean;
  toggleOppmøte: () => Promise<boolean>;
}

export const useJobbsøkerOppmøte = (
  rekrutteringstreffId: string,
  personTreffId: string,
  status: JobbsøkerStatusType,
  oppdaterJobbsøkere: () => Promise<void>,
): JobbsøkerOppmøte => {
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const { data: treffgjennomføring } =
    useTreffgjennomføring(rekrutteringstreffId);

  const erMøtt = status === JobbsøkerStatus.MØTT_OPP;
  const registreringerSomBlokkerer = tellRegistreringer(
    treffgjennomføring,
    personTreffId,
  );
  const fjerningErBlokkert =
    erMøtt && harRegistreringer(registreringerSomBlokkerer);

  const toggleOppmøte = async () => {
    if (lagrer) return false;

    setFeil(null);
    setLagrer(true);
    try {
      await oppdaterOppmøte(rekrutteringstreffId, personTreffId, !erMøtt);
      await oppdaterJobbsøkere();
      return true;
    } catch {
      setFeil('Kunne ikke oppdatere oppmøtet. Prøv igjen.');
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte: treffgjennomføring !== undefined,
    erMøtt,
    lagrer,
    feil,
    registreringerSomBlokkerer,
    fjerningErBlokkert,
    toggleOppmøte,
  };
};
