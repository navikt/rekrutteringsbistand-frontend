'use client';

import {
  registrerBrukAvLagretSøk,
  useHentLagredeSøk,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkApi';
import type {
  LagredeSøkDomene,
  LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  BRUK_STANDARDSØK_PARAM,
  LAGRET_SØK_PARAM,
} from '@/components/lagrede-søk/lagredeSøkParametere';
import { useLatestRef } from '@/hooks/useLatestRef';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useRef, useState } from 'react';

const IKKE_FUNNET =
  'Fant ikke det lagrede søket. Det kan være slettet fordi det ikke er brukt på seks måneder.';

/** Hendelser i lagrede søk. Navnene er like nøklene i UmamiEvent, så domenet kan slå dem opp direkte. */
export type LagretSøkHendelse =
  | 'lagret_søk_brukt_fra_menyen'
  | 'lagret_søk_brukt_fra_administrasjon'
  | 'standardsøk_brukt'
  | 'lagret_søk_lagret_som_nytt'
  | 'lagret_søk_erstattet'
  | 'lagret_søk_slettet'
  | 'lagret_søk_satt_som_standard'
  | 'vanlig_søk_brukt_fra_menyen'
  | 'vanlig_søk_brukt_fra_administrasjon'
  | 'vanlig_søk_satt_som_standard';

interface UseLagredeSøkProps {
  domene: LagredeSøkDomene;
  /** URL-parametere for domenets filtre. Står ingen av dem i URL-en når siden åpnes, brukes standardsøket. */
  søkeparametere: readonly string[];
  /** Filtrene som lagres, som kanonisk query-streng uten søkeord. */
  gjeldendeFilter: string;
  /** Setter domenets filtre fra et lagret filter. Parametere som mangler, skal få standardverdien. */
  settFiltre: (filter: string) => void;
  /** Setter søkeordene uten å nullstille aktivt søk. */
  settSøkeord: (søkeord: string[]) => void;
  /** Sporer bruk av lagrede søk, for eksempel i Umami.*/
  sporHendelse: (hendelse: LagretSøkHendelse) => void;
  /**
   * Gjør om et lagret filter til samme form som `gjeldendeFilter`, så like søk regnes som like.
   * Lagrede filtre kan ha en annen rekkefølge eller standardverdier, for eksempel etter konverteringen
   * fra den gamle løsningen. Må være en stabil funksjon. Uten den sammenlignes filtrene tegn for tegn.
   */
  normaliserFilter?: (filter: string) => string;
  /**
   * Om standardsøket brukes når siden åpnes uten søkeparametere. Standard er `true`.
   * Menylenken med `brukStandardsok=true` bruker standardsøket uansett.
   */
  brukStandardsøkVedOppstart?: boolean;
}

const uendret = (filter: string) => filter;

export const useLagredeSøk = ({
  domene,
  søkeparametere,
  gjeldendeFilter,
  settFiltre,
  settSøkeord,
  sporHendelse,
  normaliserFilter = uendret,
  brukStandardsøkVedOppstart = true,
}: UseLagredeSøkProps) => {
  /**
   * Id-en til det lagrede søket som er i bruk. Står i URL-en, så valget overlever refresh.
   * Søkeordene står ikke i URL-en. De hentes fra det lagrede søket når siden åpnes.
   */
  const [aktivtSøkId, setAktivtSøkIdIUrl] = useQueryState(
    LAGRET_SØK_PARAM,
    parseAsString,
  );
  const { visVarsel } = useApplikasjonContext();
  const [brukStandardsok, setBrukStandardsok] = useQueryState(
    BRUK_STANDARDSØK_PARAM,
    parseAsBoolean,
  );
  const sisteValg = useRef(0);

  const setAktivtSøkId = useCallback(
    (id: string | null) => {
      sisteValg.current += 1;
      void setBrukStandardsok(null);
      return setAktivtSøkIdIUrl(id);
    },
    [setAktivtSøkIdIUrl, setBrukStandardsok],
  );
  const liste = useHentLagredeSøk(domene);
  const { mutate } = liste;
  const sporHendelseRef = useLatestRef(sporHendelse);
  const sporHendelseStabil = useCallback(
    (h: LagretSøkHendelse) => sporHendelseRef.current(h),
    [sporHendelseRef],
  );

  const hentGjeldendeSøk = useCallback(
    async (søk: LagretSøkDTO): Promise<LagretSøkDTO | null> => {
      try {
        const oppdatert = await registrerBrukAvLagretSøk(domene, søk.id);
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
    (søk: LagretSøkDTO) => {
      settFiltre(søk.filter);
      settSøkeord(søk.fritekst);
      void setAktivtSøkIdIUrl(søk.id);
      void setBrukStandardsok(null);
    },
    [settFiltre, settSøkeord, setAktivtSøkIdIUrl, setBrukStandardsok],
  );

  const brukLagretSøk = useCallback(
    async (søk: LagretSøkDTO) => {
      const valg = ++sisteValg.current;
      const gjeldende = await hentGjeldendeSøk(søk);
      if (!gjeldende || valg !== sisteValg.current) return false;
      settFraLagretSøk(gjeldende);
      return true;
    },
    [hentGjeldendeSøk, settFraLagretSøk],
  );

  // Menylenken skal gi samme utgangspunkt som «Fjern alle filtre». URL-en nullstiller filtrene, men søkeordene
  // ligger i state og overlever navigeringen. De tømmes én gang per inngang, så søkeord veilederen skriver
  // mens standardsøket hentes, blir stående.
  const søkeordTømtForInngang = useRef(false);
  useEffect(() => {
    if (!brukStandardsok) {
      søkeordTømtForInngang.current = false;
      return;
    }
    if (søkeordTømtForInngang.current) return;
    søkeordTømtForInngang.current = true;
    settSøkeord([]);
  }, [brukStandardsok, settSøkeord]);

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

    void brukLagretSøk(standardsøk)
      .catch(() => false)
      .then((brukt) => {
        if (brukt) {
          sporHendelseRef.current('standardsøk_brukt');
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
    sporHendelseRef,
    setBrukStandardsok,
    brukLagretSøk,
  ]);

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
    if (
      brukStandardsøkVedOppstart &&
      !alleParametere.some((navn) => parametere.has(navn))
    ) {
      void setBrukStandardsok(true);
    }
    setSøkSomGjenopprettes(parametere.get(LAGRET_SØK_PARAM));
    setStartsjekkFerdig(true);
    // Leser URL-en én gang ved oppstart. Senere endringer i URL-en eller props skal ikke starte oppstarten på nytt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Etter refresh står filtrene og id-en til søket i URL-en, men søkeordene mangler.
  // Vi henter dem fra det lagrede søket hvis filtrene er uendret. Ellers er søket ikke lenger i bruk.
  // Har veilederen valgt noe annet eller endret søket før lista er hentet, gjenopprettes ingenting.
  useEffect(() => {
    if (!søkSomGjenopprettes) return;
    if (aktivtSøkId === søkSomGjenopprettes) {
      if (liste.isLoading) return;
      const søk = liste.data?.find((s) => s.id === søkSomGjenopprettes);
      if (
        søk &&
        normaliserFilter(søk.filter) === normaliserFilter(gjeldendeFilter)
      ) {
        settSøkeord(søk.fritekst);
      } else {
        void setAktivtSøkIdIUrl(null);
      }
    }
    // Nullstiller når gjenopprettingen er ferdig, så effekten ikke kjører igjen og søket kan starte.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSøkSomGjenopprettes(null);
  }, [
    søkSomGjenopprettes,
    aktivtSøkId,
    liste.isLoading,
    liste.data,
    gjeldendeFilter,
    normaliserFilter,
    settSøkeord,
    setAktivtSøkIdIUrl,
  ]);

  const venterPåStandardsøk =
    !startsjekkFerdig ||
    brukStandardsok === true ||
    søkSomGjenopprettes !== null;

  return {
    domene,
    aktivtSøkId,
    setAktivtSøkId,
    brukLagretSøk,
    venterPåStandardsøk,
    normaliserFilter,
    sporHendelse: sporHendelseStabil,
  };
};

export type LagredeSøkTilstand = ReturnType<typeof useLagredeSøk>;
