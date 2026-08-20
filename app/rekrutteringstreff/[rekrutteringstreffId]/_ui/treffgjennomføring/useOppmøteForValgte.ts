'use client';

import type { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  tellRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { useTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useState } from 'react';

interface OppmøteForValgte {
  visOppmøte: boolean;
  antallSomKanMarkeres: number;
  antallSomKanFjernes: number;
  registreringerSomSlettes: Treffgjennomføringsregistreringer;
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

  const registreringerSomSlettes =
    alleredeMøtt.reduce<Treffgjennomføringsregistreringer>(
      (sum, jobbsøker) => {
        const registreringer = tellRegistreringer(
          treffgjennomføring,
          jobbsøker.personTreffId,
        );
        return {
          interesser: sum.interesser + registreringer.interesser,
          intervjuplasser: sum.intervjuplasser + registreringer.intervjuplasser,
          vurderinger: sum.vurderinger + registreringer.vurderinger,
        };
      },
      { interesser: 0, intervjuplasser: 0, vurderinger: 0 },
    );

  const settOppmøte = async (
    jobbsøkere: Pick<JobbsøkerSøkTreffDTO, 'personTreffId'>[],
    møtt: boolean,
    feilmelding: string,
    bekreftSlettRegistreringer = false,
  ) => {
    if (lagrer || jobbsøkere.length === 0) return false;

    setFeil(null);
    setLagrer(true);
    try {
      for (const { personTreffId } of jobbsøkere) {
        await oppdaterOppmøte(
          rekrutteringstreffId,
          personTreffId,
          møtt,
          bekreftSlettRegistreringer,
        );
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
    antallSomKanFjernes: alleredeMøtt.length,
    registreringerSomSlettes,
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
        alleredeMøtt,
        false,
        'Kunne ikke fjerne oppmøtet for alle. Prøv igjen.',
        true,
      ),
  };
};
