'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/mutations';
import {
  tellRegistreringer,
  type Treffgjennomforingsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/treffgjennomforingHjelpere';
import type { TreffgjennomforingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { useTreffgjennomforingFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useState } from 'react';

interface OppmøteForValgte {
  visOppmøte: boolean;
  antallSomKanMarkeres: number;
  antallSomKanFjernes: number;
  registreringerSomSlettes: Treffgjennomforingsregistreringer;
  lagrer: boolean;
  feil: string | null;
  markerMøtt: () => Promise<boolean>;
  fjernOppmøte: () => Promise<boolean>;
}

export const useOppmøteForValgte = (
  valgtePersonTreffIder: string[],
): OppmøteForValgte => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { visTreffgjennomforing, treffgjennomforing, mutate } =
    useTreffgjennomforingFane();
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const ikkeMøttEnda = valgtePersonTreffIder.filter(
    (personTreffId) => !treffgjennomforing?.oppmøte.includes(personTreffId),
  );
  const alleredeMøtt = valgtePersonTreffIder.filter((personTreffId) =>
    treffgjennomforing?.oppmøte.includes(personTreffId),
  );

  const registreringerSomSlettes =
    alleredeMøtt.reduce<Treffgjennomforingsregistreringer>(
      (sum, personTreffId) => {
        const registreringer = tellRegistreringer(
          treffgjennomforing,
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
    let sisteSvar: TreffgjennomforingDTO | undefined;
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
    visOppmøte: visTreffgjennomforing,
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
