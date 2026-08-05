'use client';

import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  tellRegistreringer,
  type Møtedagsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useWorkOpMøtedag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useWorkOpMøtedag';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useState } from 'react';

interface OppmøteForValgte {
  visOppmøte: boolean;
  /** De av de valgte som ikke allerede står som møtt. */
  antallSomKanMarkeres: number;
  /** De av de valgte som står som møtt i dag. */
  antallSomKanFjernes: number;
  /** Summen av det som slettes hvis oppmøtet fjernes for alle de valgte. */
  registreringerSomSlettes: Møtedagsregistreringer;
  lagrer: boolean;
  feil: string | null;
  /** Sann når alle ble registrert. */
  markerMøtt: () => Promise<boolean>;
  /** Sann når oppmøtet ble fjernet for alle. Krever bekreftelse i UI-et. */
  fjernOppmøte: () => Promise<boolean>;
}

/**
 * Setter eller fjerner oppmøte for flere valgte jobbsøkere i én handling.
 *
 * Kallene går sekvensielt mot det vanlige oppmøte-endepunktet. Hvert svar er
 * hele møtedagen, så det siste er fasit og legges i cachen. Rekkefølgen er med
 * vilje: parallelle kall ville kappes om den samme raden.
 *
 * Å fjerne oppmøte sletter ønsker, intervjuplasser og vurderinger. Derfor
 * teller hooken opp hva som forsvinner (`registreringerSomSlettes`), slik at
 * bekreftelsesdialogen kan vise konsekvensen samlet før noe kjøres.
 */
export const useOppmøteForValgte = (
  valgtePersonTreffIder: string[],
): OppmøteForValgte => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { visWorkOp, møtedag, mutate } = useWorkOpMøtedag();
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
        ønsker: sum.ønsker + registreringer.ønsker,
        intervjuplasser: sum.intervjuplasser + registreringer.intervjuplasser,
        vurderinger: sum.vurderinger + registreringer.vurderinger,
      };
    },
    { ønsker: 0, intervjuplasser: 0, vurderinger: 0 },
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
      // Noen av kallene kan ha gått gjennom før det feilet, så vi henter fasit.
      await mutate();
      return false;
    } finally {
      setLagrer(false);
    }
  };

  return {
    visOppmøte: visWorkOp,
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
