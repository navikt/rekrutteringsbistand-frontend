'use client';

import type { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  harRegistreringer,
  tellRegistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { useTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useState } from 'react';

interface OppmøteForValgte {
  visOppmøte: boolean;
  antallSomKanMarkeres: number;
  antallSomKanFjernes: number;
  antallBlokkerte: number;
  lagrer: boolean;
  feil: string | null;
  markerMøtt: () => Promise<boolean>;
  fjernOppmøte: () => Promise<boolean>;
}

export const useOppmøteForValgte = (
  valgteJobbsøkere: Pick<JobbsøkerSøkTreffDTO, 'personTreffId' | 'status'>[],
  visOppmøte: boolean,
  oppdaterJobbsøkere: () => Promise<void>,
): OppmøteForValgte => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const { data: treffgjennomføring } =
    useTreffgjennomføring(rekrutteringstreffId);

  const ikkeMøttEnda = valgteJobbsøkere.filter(
    (jobbsøker) => jobbsøker.status !== JobbsøkerStatus.MØTT_OPP,
  );
  const alleredeMøtt = valgteJobbsøkere.filter(
    (jobbsøker) => jobbsøker.status === JobbsøkerStatus.MØTT_OPP,
  );

  const blokkerte = alleredeMøtt.filter((jobbsøker) =>
    harRegistreringer(
      tellRegistreringer(treffgjennomføring, jobbsøker.personTreffId),
    ),
  );
  const kanFjernes = alleredeMøtt.filter(
    (jobbsøker) => !blokkerte.includes(jobbsøker),
  );

  const settOppmøte = async (
    jobbsøkere: Pick<JobbsøkerSøkTreffDTO, 'personTreffId'>[],
    møtt: boolean,
    feilmelding: string,
  ) => {
    if (lagrer || jobbsøkere.length === 0) return false;

    setFeil(null);
    setLagrer(true);
    try {
      for (const { personTreffId } of jobbsøkere) {
        await oppdaterOppmøte(rekrutteringstreffId, personTreffId, møtt);
      }
      await oppdaterJobbsøkere();
      return true;
    } catch {
      setFeil(feilmelding);
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte,
    antallSomKanMarkeres: ikkeMøttEnda.length,
    antallSomKanFjernes: kanFjernes.length,
    antallBlokkerte: blokkerte.length,
    lagrer,
    feil,
    markerMøtt: () =>
      settOppmøte(
        ikkeMøttEnda,
        true,
        'Kunne ikke registrere oppmøtet for alle. Prøv igjen.',
      ),
    fjernOppmøte: () =>
      settOppmøte(
        kanFjernes,
        false,
        'Kunne ikke fjerne oppmøtet for alle. Prøv igjen.',
      ),
  };
};
