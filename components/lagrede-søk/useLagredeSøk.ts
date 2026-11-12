'use client';

import {
  registrerBrukAvLagretSøk,
  useHentLagredeSøk,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkApi';
import type {
  LagredeSøkDomene,
  LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import type { FrieFilterverdier } from '@/components/lagrede-søk/fødselsnummer';
import { finnLiktSøk } from '@/components/lagrede-søk/harSammeInnhold';
import { BRUK_STANDARDSØK_PARAM } from '@/components/lagrede-søk/lagredeSøkParametere';
import {
  hentSøkeordIMinnet,
  lagreSøkeordIMinnet,
} from '@/components/lagrede-søk/søkeordIMinnet';
import { useLatestRef } from '@/hooks/useLatestRef';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { parseAsBoolean, useQueryState } from 'nuqs';
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
  | 'lagret_søk_fikk_nytt_navn'
  | 'lagret_søk_slettet'
  | 'lagret_søk_satt_som_standard'
  | 'vanlig_søk_brukt_fra_menyen'
  | 'vanlig_søk_brukt_fra_administrasjon'
  | 'vanlig_søk_satt_som_standard'
  | 'forhåndsutfylt_søk_brukt_fra_menyen';

/**
 * Filtrene og søkeordene siden selv fyller ut, for eksempel sted og yrke fra en stilling eller jobbønskene til en
 * jobbsøker. Siden starter med dem når URL-en ikke har parametere, og menyen viser dem øverst som standard.
 */
export interface ForhåndsutfyltSøk {
  navn: string;
  merknad?: string;
  filter: string;
  søkeord?: string[];
}

interface UseLagredeSøkProps {
  domene: LagredeSøkDomene;
  gjeldendeFilter: string;
  gjeldendeSøkeord: string[];
  settFiltre: (filter: string) => void;
  settSøkeord: (søkeord: string[]) => void;
  sporHendelse: (hendelse: LagretSøkHendelse) => void;
  normaliserFilter?: (filter: string) => string;
  frieFilterverdier?: FrieFilterverdier[];
  /** Skiller søkeordene i minnet når samme domene brukes på flere sider. Uten den brukes domenet. */
  minnenøkkel?: string;
  forhåndsutfyltSøk?: ForhåndsutfyltSøk | null;
}

const uendret = (filter: string) => filter;
const ingenFrieFilterverdier: FrieFilterverdier[] = [];
const ingenSøkeord: string[] = [];

/**
 * Felles tilstand for lagrede søk i et domene: standardsøket fra menylenken, søkeordene i minnet, tilbake og fram i
 * nettleseren og hvilket lagret søk som er valgt. Menyen `LagredeSøk` får alt den trenger herfra.
 */
export const useLagredeSøk = ({
  domene,
  gjeldendeFilter,
  gjeldendeSøkeord,
  settFiltre,
  settSøkeord,
  sporHendelse,
  normaliserFilter = uendret,
  frieFilterverdier = ingenFrieFilterverdier,
  minnenøkkel = domene,
  forhåndsutfyltSøk,
}: UseLagredeSøkProps) => {
  const { visVarsel } = useApplikasjonContext();
  const [brukStandardsok, setBrukStandardsok] = useQueryState(
    BRUK_STANDARDSØK_PARAM,
    parseAsBoolean,
  );
  // Hvert valg av et lagret søk får et nummer. Svaret brukes bare hvis ingen annen handling har kommet
  // mens vi ventet: et nytt valg, en endring fra veilederen, tilbake og fram eller at veilederen har gått til
  // en annen side.
  const valgnummer = useRef(0);
  const montert = useRef(false);
  const forkastVentendeLagretSøk = useCallback(() => {
    valgnummer.current += 1;
  }, []);
  const [endringsteller, setEndringsteller] = useState(0);
  const søkeordEndret = useCallback(() => setEndringsteller((n) => n + 1), []);

  // Normalisert filter fra det forhåndsutfylte søket som er satt ved oppstart, men ikke kommet i URL-en ennå.
  const [ventendeForhåndsutfylling, setVentendeForhåndsutfylling] = useState<
    string | null
  >(null);
  const søkEndret = useCallback(() => {
    forkastVentendeLagretSøk();
    setVentendeForhåndsutfylling(null);
    søkeordEndret();
    void setBrukStandardsok(null);
  }, [forkastVentendeLagretSøk, setBrukStandardsok, søkeordEndret]);
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
        if (!montert.current) return null;
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
      void setBrukStandardsok(null);
      søkeordEndret();
    },
    [settFiltre, settSøkeord, setBrukStandardsok, søkeordEndret],
  );

  /** Vanlig søk er standardverdiene for filtrene og ingen søkeord. */
  const brukVanligSøk = useCallback(() => {
    settFiltre('');
    settSøkeord([]);
    søkEndret();
  }, [settFiltre, settSøkeord, søkEndret]);

  // Uten egne filtre eller søkeord er det forhåndsutfylte søket det samme som vanlig søk, så det brukes ikke.
  const aktivtForhåndsutfyltSøk =
    forhåndsutfyltSøk &&
    (normaliserFilter(forhåndsutfyltSøk.filter) !== '' ||
      (forhåndsutfyltSøk.søkeord?.length ?? 0) > 0)
      ? forhåndsutfyltSøk
      : null;
  const forhåndsutfyltFilter = aktivtForhåndsutfyltSøk?.filter ?? '';
  const forhåndsutfylteSøkeord =
    aktivtForhåndsutfyltSøk?.søkeord ?? ingenSøkeord;
  const brukForhåndsutfyltSøk = useCallback(() => {
    settFiltre(forhåndsutfyltFilter);
    settSøkeord(forhåndsutfylteSøkeord);
    søkEndret();
  }, [
    settFiltre,
    settSøkeord,
    søkEndret,
    forhåndsutfyltFilter,
    forhåndsutfylteSøkeord,
  ]);

  const brukLagretSøk = useCallback(
    async (søk: LagretSøkDTO) => {
      const valg = ++valgnummer.current;
      const gjeldende = await hentGjeldendeSøk(søk);
      if (!gjeldende || valg !== valgnummer.current) return false;
      settFraLagretSøk(gjeldende);
      return true;
    },
    [hentGjeldendeSøk, settFraLagretSøk],
  );

  // Menylenken skal gi samme utgangspunkt som «Fjern alle filtre».
  const søkeordTømtForInngang = useRef(false);
  useEffect(() => {
    if (!brukStandardsok) {
      søkeordTømtForInngang.current = false;
      return;
    }
    if (søkeordTømtForInngang.current) return;
    søkeordTømtForInngang.current = true;
    settSøkeord([]);
    søkeordEndret();
  }, [brukStandardsok, settSøkeord, søkeordEndret]);

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

    const valg = valgnummer.current + 1;
    void brukLagretSøk(standardsøk)
      .catch(() => false)
      .then((brukt) => {
        if (brukt) {
          sporHendelseRef.current('standardsøk_brukt');
        } else if (valg === valgnummer.current) {
          // Har noe annet skjedd mens vi ventet, rydder den handlingen URL-en selv. Etter unmount tilhører
          // URL-en en annen side.
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

  useEffect(() => {
    montert.current = true;
    return () => {
      montert.current = false;
      forkastVentendeLagretSøk();
      // Strict Mode i dev monterer på nytt. Da må standardsøket kunne startes igjen.
      behandlerStandardsøk.current = false;
    };
  }, [forkastVentendeLagretSøk]);

  const [startsjekkFerdig, setStartsjekkFerdig] = useState(false);
  if (
    ventendeForhåndsutfylling !== null &&
    normaliserFilter(gjeldendeFilter) === ventendeForhåndsutfylling
  ) {
    setVentendeForhåndsutfylling(null);
  }
  useEffect(() => {
    // URL-en finnes bare i nettleseren, så oppstarten må skje i en effekt.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartsjekkFerdig(true);
    if (brukStandardsok !== true) {
      // Uten parametere i URL-en starter siden med det forhåndsutfylte søket. Et lagret søk, en kandidat i sidepanelet eller
      // filtre etter refresh står i URL-en og beholdes.
      const fraForhåndsutfyltSøk =
        aktivtForhåndsutfyltSøk !== null && window.location.search === '';
      const filter = fraForhåndsutfyltSøk
        ? normaliserFilter(forhåndsutfyltFilter)
        : normaliserFilter(gjeldendeFilter);
      const søkeordIMinnet = hentSøkeordIMinnet(minnenøkkel, filter);
      if (fraForhåndsutfyltSøk) {
        settFiltre(forhåndsutfyltFilter);
        setVentendeForhåndsutfylling(filter);
      }
      // Har veilederen endret søkeordene for det forhåndsutfylte søket tidligere, brukes de, som for andre filtre.
      const søkeord =
        fraForhåndsutfyltSøk && søkeordIMinnet.length === 0
          ? forhåndsutfylteSøkeord
          : søkeordIMinnet;
      settSøkeord(søkeord);
      // De forhåndsutfylte søkeordene huskes, så de står når veilederen går tilbake fra en stilling.
      if (søkeord !== søkeordIMinnet && søkeord.length > 0) søkeordEndret();
      if (
        new URLSearchParams(window.location.search).has(BRUK_STANDARDSØK_PARAM)
      ) {
        void setBrukStandardsok(null);
      }
    }
    // Leser URL-en én gang ved oppstart. Senere endringer i URL-en skal ikke starte oppstarten på nytt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [urlFraHistorikken, setUrlFraHistorikken] = useState<string | null>(
    null,
  );
  const [historikkTidsavbrudd, setHistorikkTidsavbrudd] = useState(false);
  useEffect(() => {
    const vedHistorikk = () => {
      forkastVentendeLagretSøk();
      setVentendeForhåndsutfylling(null);
      setHistorikkTidsavbrudd(false);
      setUrlFraHistorikken(window.location.search);
    };
    window.addEventListener('popstate', vedHistorikk);
    return () => window.removeEventListener('popstate', vedHistorikk);
  }, [forkastVentendeLagretSøk]);

  // Sikkerhetsnett, så søket ikke venter for alltid hvis filtrene aldri blir like URL-en.
  useEffect(() => {
    if (urlFraHistorikken === null) return;
    const tidsavbrudd = setTimeout(() => setHistorikkTidsavbrudd(true), 1000);
    return () => clearTimeout(tidsavbrudd);
  }, [urlFraHistorikken]);

  useEffect(() => {
    if (urlFraHistorikken === null) return;
    const parametere = new URLSearchParams(urlFraHistorikken);
    parametere.delete(BRUK_STANDARDSØK_PARAM);
    const filterIUrl = normaliserFilter(parametere.toString());
    const oppdatert = filterIUrl === normaliserFilter(gjeldendeFilter);
    if (!oppdatert && !historikkTidsavbrudd) return;
    settSøkeord(hentSøkeordIMinnet(minnenøkkel, filterIUrl));
    setUrlFraHistorikken(null);
  }, [
    urlFraHistorikken,
    historikkTidsavbrudd,
    minnenøkkel,
    gjeldendeFilter,
    normaliserFilter,
    settSøkeord,
  ]);

  const venterPåFiltreOgSøkeord =
    !startsjekkFerdig ||
    brukStandardsok === true ||
    urlFraHistorikken !== null ||
    ventendeForhåndsutfylling !== null;

  const gjeldendeLagretSøk = liste.data
    ? finnLiktSøk(
        liste.data,
        gjeldendeFilter,
        gjeldendeSøkeord,
        normaliserFilter,
      )
    : undefined;

  useEffect(() => {
    if (endringsteller === 0) return;
    lagreSøkeordIMinnet(
      minnenøkkel,
      normaliserFilter(gjeldendeFilter),
      gjeldendeSøkeord,
    );
    // Kjører bare når veilederen har endret noe. Filtrene og søkeordene leses fra samme render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endringsteller]);

  return {
    domene,
    liste,
    gjeldendeFilter,
    gjeldendeSøkeord,
    frieFilterverdier,
    gjeldendeLagretSøk,
    søkEndret,
    brukLagretSøk,
    brukVanligSøk,
    forhåndsutfyltSøk: aktivtForhåndsutfyltSøk,
    brukForhåndsutfyltSøk,
    venterPåFiltreOgSøkeord,
    normaliserFilter,
    sporHendelse: sporHendelseStabil,
  };
};

export type LagredeSøkTilstand = ReturnType<typeof useLagredeSøk>;
