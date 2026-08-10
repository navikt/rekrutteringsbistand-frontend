'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  tellRegistreringer,
  type Møtedagsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useMøtedagFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useState } from 'react';

interface OppmøteForValgte {
  visOppmøte: boolean;
  antallSomKanMarkeres: number;
  antallSomKanFjernes: number;
  registreringerSomSlettes: Møtedagsregistreringer;
  lagrer: boolean;
  feil: string | null;
  markerMøtt: () => Promise<boolean>;
  fjernOppmøte: () => Promise<boolean>;
}

export const useOppmøteForValgte = (
  valgtePersonTreffIder: string[],
): OppmøteForValgte => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { visMøtedag, møtedag, mutate } = useMøtedagFane();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const ikkeMøttEnda = valgtePersonTreffIder.filter(
    (personTreffId) => !møtedag?.oppmøte.includes(personTreffId),
  );
  const alleredeMøtt = valgtePersonTreffIder.filter((personTreffId) =>
    møtedag?.oppmøte.includes(personTreffId),
  );

  const registreringerSomSlettes = alleredeMøtt.reduce<Møtedagsregistreringer>(
    (sum, personTreffId) => {
      const registreringer = tellRegistreringer(møtedag, personTreffId);
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
    let sisteSvar: MøtedagDTO | undefined;
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
    visOppmøte: visMøtedag,
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
