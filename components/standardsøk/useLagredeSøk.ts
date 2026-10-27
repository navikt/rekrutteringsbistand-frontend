'use client';

import type {
  StandardsøkDomene,
  StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import { erUtløpt } from '@/components/standardsøk/standardsøkDato';
import {
  BRUK_STANDARDSØK_PARAM,
  LAGRET_SØK_PARAM,
} from '@/components/standardsøk/standardsøkParametere';
import { useBrukStandardsøk } from '@/components/standardsøk/useBrukStandardsøk';
import { useStandardsøkFraMenylenke } from '@/components/standardsøk/useStandardsøkFraMenylenke';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useState } from 'react';

/**
 * Id-en til det lagrede søket som er i bruk. Står i URL-en, så valget overlever refresh.
 * Søkeordene står ikke i URL-en. De hentes fra det lagrede søket når siden åpnes.
 * Domenet kaller denne tidlig, fordi setterne for filtre og søkeord skal nullstille id-en:
 * endrer veilederen filtre eller søkeord, er søket ikke lenger i bruk.
 */
export const useAktivtLagretSøkId = () =>
  useQueryState(LAGRET_SØK_PARAM, parseAsString);

interface UseLagredeSøkProps {
  domene: StandardsøkDomene;
  /** URL-parametere for domenets filtre. Står ingen av dem i URL-en når siden åpnes, brukes standardsøket. */
  søkeparametere: readonly string[];
  /** Filtrene som lagres, som kanonisk query-streng uten søkeord. */
  gjeldendeFilter: string;
  setAktivtSøkId: (id: string | null) => unknown;
  /** Setter domenets filtre fra et lagret filter. Parametere som mangler, skal få standardverdien. */
  settFiltre: (filter: string) => void;
  /** Setter søkeordene uten å nullstille aktivt søk. */
  settSøkeord: (søkeord: string[]) => void;
  /** Kalles når standardsøket er brukt fra menylenken eller ved oppstart. Må være stabil (useCallback). */
  onStandardsøkBrukt: () => void;
}

/**
 * Felles flyt for lagrede søk i et søk: bruk av lagret søk, standardsøket ved oppstart og fra menylenken,
 * og gjenoppretting av søkeord etter refresh. Domenet eier filtrene og hvordan de tolkes.
 */
export const useLagredeSøk = ({
  domene,
  søkeparametere,
  gjeldendeFilter,
  setAktivtSøkId,
  settFiltre,
  settSøkeord,
  onStandardsøkBrukt,
}: UseLagredeSøkProps) => {
  const { visVarsel } = useApplikasjonContext();
  const [brukStandardsok, setBrukStandardsok] = useQueryState(
    BRUK_STANDARDSØK_PARAM,
    parseAsBoolean,
  );
  const { liste, hentGjeldendeSøk } = useBrukStandardsøk(domene);

  const settFraLagretSøk = useCallback(
    (søk: StandardsøkDTO) => {
      settFiltre(søk.filter);
      settSøkeord(søk.fritekst);
      void setAktivtSøkId(søk.id);
      void setBrukStandardsok(null);
    },
    [settFiltre, settSøkeord, setAktivtSøkId, setBrukStandardsok],
  );

  const brukLagretSøk = useCallback(
    async (søk: StandardsøkDTO) => {
      const gjeldende = await hentGjeldendeSøk(søk);
      if (!gjeldende) return false;
      settFraLagretSøk(gjeldende);
      return true;
    },
    [hentGjeldendeSøk, settFraLagretSøk],
  );

  // Standardsøket brukes når siden åpnes uten søkeparametere, og når menylenken legger på brukStandardsok=true.
  // Menylenken trengs fordi siden ikke lastes på nytt når veilederen allerede står på søket.
  // Søket mot domenet venter til listen er hentet på nytt, så vi ikke velger fra en utdatert cache.
  const [startsjekkFerdig, setStartsjekkFerdig] = useState(false);
  const [søkSomGjenopprettes, setSøkSomGjenopprettes] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const parametere = new URLSearchParams(window.location.search);
    const alleParametere = [
      ...søkeparametere,
      BRUK_STANDARDSØK_PARAM,
      LAGRET_SØK_PARAM,
    ];
    if (!alleParametere.some((navn) => parametere.has(navn))) {
      void setBrukStandardsok(true);
    }
    // URL-en leses etter hydrering, så server og klient viser samme lastevisning først.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSøkSomGjenopprettes(parametere.get(LAGRET_SØK_PARAM));
    setStartsjekkFerdig(true);
    // Bare ved oppstart. Senere endringer i URL-en skal ikke hente standardsøket.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Etter refresh står filtrene og id-en til søket i URL-en, men søkeordene mangler.
  // Vi henter dem fra det lagrede søket hvis filtrene er uendret. Ellers er søket ikke lenger i bruk.
  useEffect(() => {
    if (!søkSomGjenopprettes || liste.isLoading) return;
    const søk = liste.data?.find(
      (s) => s.id === søkSomGjenopprettes && !erUtløpt(s),
    );
    if (søk && søk.filter === gjeldendeFilter) {
      settSøkeord(søk.fritekst);
    } else {
      void setAktivtSøkId(null);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSøkSomGjenopprettes(null);
  }, [
    søkSomGjenopprettes,
    liste.isLoading,
    liste.data,
    gjeldendeFilter,
    settSøkeord,
    setAktivtSøkId,
  ]);

  const visFeilVedStandardsøk = useCallback(() => {
    visVarsel({
      type: 'error',
      tekst: 'Kunne ikke hente standardsøket. Viser vanlig søk.',
    });
  }, [visVarsel]);

  useStandardsøkFraMenylenke({
    brukStandardsok,
    setBrukStandardsok,
    liste,
    brukLagretSøk,
    onSøkBrukt: onStandardsøkBrukt,
    onFeil: visFeilVedStandardsøk,
  });

  /** Sann mens siden venter på standardsøket. Søket mot domenet starter først etterpå. */
  const venterPåStandardsøk =
    !startsjekkFerdig ||
    brukStandardsok === true ||
    søkSomGjenopprettes !== null;

  return { brukLagretSøk, venterPåStandardsøk };
};
