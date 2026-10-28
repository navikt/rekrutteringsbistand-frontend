'use client';

import type {
  StandardsøkDomene,
  StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  registrerBrukAvStandardsøk,
  useStandardsøk,
} from '@/app/api/bruker/standardsok/useStandardsøk';
import {
  BRUK_STANDARDSØK_PARAM,
  LAGRET_SØK_PARAM,
} from '@/components/standardsøk/standardsøkParametere';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useRef, useState } from 'react';

const IKKE_FUNNET =
  'Fant ikke det lagrede søket. Det kan være slettet fordi det ikke er brukt på seks måneder.';

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
  const liste = useStandardsøk(domene);
  const { mutate } = liste;

  /**
   * Kontrollerer søket mot backend før det tas i bruk. 404 gir null, så et slettet
   * søk aldri blir aktivert. Backend skriver likevel høyst én gang i døgnet per søk.
   */
  const hentGjeldendeSøk = useCallback(
    async (søk: StandardsøkDTO): Promise<StandardsøkDTO | null> => {
      try {
        const oppdatert = await registrerBrukAvStandardsøk(domene, søk.id);
        await mutate(
          (data) => data?.map((s) => (s.id === oppdatert.id ? oppdatert : s)),
          { revalidate: false },
        );
        return oppdatert;
      } catch (error) {
        if (RekbisError.ensure(error).statuskode === 404) {
          visVarsel({ type: 'warning', tekst: IKKE_FUNNET });
          await mutate();
        } else {
          visVarsel({
            type: 'error',
            tekst: 'Kunne ikke bruke det lagrede søket. Prøv igjen.',
          });
        }
        return null;
      }
    },
    [domene, mutate, visVarsel],
  );

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

  const behandlerStandardsøk = useRef(false);
  const { data, error, isLoading, isValidating } = liste;
  useEffect(() => {
    if (!brukStandardsok) {
      behandlerStandardsøk.current = false;
      return;
    }

    if (behandlerStandardsøk.current || isLoading || isValidating) {
      return;
    }

    behandlerStandardsøk.current = true;

    const standardsøk = data?.find((søk) => søk.erStandard);
    if (!standardsøk) {
      if (error) {
        visVarsel({
          type: 'error',
          tekst: 'Kunne ikke hente standardsøket. Viser vanlig søk.',
        });
      }
      void setBrukStandardsok(null);
      return;
    }

    void brukLagretSøk(standardsøk).then((brukt) => {
      if (brukt) {
        onStandardsøkBrukt();
      } else {
        void setBrukStandardsok(null);
      }
    });
  }, [
    brukStandardsok,
    data,
    error,
    isLoading,
    isValidating,
    visVarsel,
    onStandardsøkBrukt,
    setBrukStandardsok,
    brukLagretSøk,
  ]);

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
      (s) => s.id === søkSomGjenopprettes,
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

  /** Sann mens siden venter på standardsøket. Søket mot domenet starter først etterpå. */
  const venterPåStandardsøk =
    !startsjekkFerdig ||
    brukStandardsok === true ||
    søkSomGjenopprettes !== null;

  return { brukLagretSøk, venterPåStandardsøk };
};
