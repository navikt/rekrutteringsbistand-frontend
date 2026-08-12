'use client';

import type { OppmøteSammendragDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  harRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
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
  oppmøte: OppmøteSammendragDTO | undefined,
  oppdaterJobbsøkere: () => Promise<void>,
): JobbsøkerOppmøte => {
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const erMøtt = oppmøte?.møtt ?? false;
  const registreringerSomSlettes = oppmøte?.registreringerSomSlettes ?? {
    interesser: 0,
    intervjuplasser: 0,
    vurderinger: 0,
  };
  const måBekrefteFjerning =
    erMøtt && harRegistreringer(registreringerSomSlettes);

  const toggleOppmøte = async (bekreftSlettRegistreringer = false) => {
    if (lagrer) return false;

    setFeil(null);
    setLagrer(true);
    try {
      await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        !erMøtt,
        bekreftSlettRegistreringer,
      );
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
    visOppmøte: oppmøte !== undefined,
    erMøtt,
    lagrer,
    feil,
    registreringerSomSlettes,
    måBekrefteFjerning,
    toggleOppmøte,
  };
};
