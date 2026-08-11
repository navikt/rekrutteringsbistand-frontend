'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  tellRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
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
  valgtePersonTreffIder: string[],
): OppmøteForValgte => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { visTreffgjennomføring, treffgjennomføring, mutate } =
    useTreffgjennomføringFane();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const ikkeMøttEnda = valgtePersonTreffIder.filter(
    (personTreffId) => !treffgjennomføring?.oppmøte.includes(personTreffId),
  );
  const alleredeMøtt = valgtePersonTreffIder.filter((personTreffId) =>
    treffgjennomføring?.oppmøte.includes(personTreffId),
  );

  const registreringerSomSlettes =
    alleredeMøtt.reduce<Treffgjennomføringsregistreringer>(
      (sum, personTreffId) => {
        const registreringer = tellRegistreringer(
          treffgjennomføring,
          personTreffId,
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
    personTreffIder: string[],
    møtt: boolean,
    feilmelding: string,
  ) => {
    if (lagrer || personTreffIder.length === 0) return false;

    setFeil(null);
    setLagrer(true);
    let sisteSvar: TreffgjennomføringDTO | undefined;
    try {
      for (const personTreffId of personTreffIder) {
        sisteSvar = await oppdaterOppmøte(
          rekrutteringstreffId,
          personTreffId,
          møtt,
        );
      }
      if (sisteSvar) await mutate(sisteSvar, { revalidate: false });
      return true;
    } catch {
      setFeil(feilmelding);
      await mutate();
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte: visTreffgjennomføring,
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
      ),
  };
};
