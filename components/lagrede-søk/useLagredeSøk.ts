'use client';

import {
  registrerBrukAvLagretSøk,
  useHentLagredeSøk,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkApi';
import type {
  LagredeSøkDomene,
  LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { finnLiktSøk } from '@/components/lagrede-søk/harSammeInnhold';
import { BRUK_STANDARDSØK_PARAM } from '@/components/lagrede-søk/lagredeSøkParametere';
import {
  hentSøkeordIFanen,
  lagreSøkeordIFanen,
} from '@/components/lagrede-søk/søkeordIFanen';
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
  | 'lagret_søk_slettet'
  | 'lagret_søk_satt_som_standard'
  | 'vanlig_søk_brukt_fra_menyen'
  | 'vanlig_søk_brukt_fra_administrasjon'
  | 'vanlig_søk_satt_som_standard';

interface UseLagredeSøkProps {
  domene: LagredeSøkDomene;
  gjeldendeFilter: string;
  gjeldendeSøkeord: string[];
  settFiltre: (filter: string) => void;
  settSøkeord: (søkeord: string[]) => void;
  sporHendelse: (hendelse: LagretSøkHendelse) => void;
  normaliserFilter?: (filter: string) => string;
}

const uendret = (filter: string) => filter;

export const useLagredeSøk = ({
  domene,
  gjeldendeFilter,
  gjeldendeSøkeord,
  settFiltre,
  settSøkeord,
  sporHendelse,
  normaliserFilter = uendret,
}: UseLagredeSøkProps) => {
  const { visVarsel } = useApplikasjonContext();
  const [brukStandardsok, setBrukStandardsok] = useQueryState(
    BRUK_STANDARDSØK_PARAM,
    parseAsBoolean,
  );
  // Hvert valg av et lagret søk får et nummer. Svaret brukes bare hvis ingen annen handling har kommet
  // mens vi ventet: et nytt valg, en endring fra veilederen eller tilbake og fram.
  const valgnummer = useRef(0);
  const forkastVentendeLagretSøk = useCallback(() => {
    valgnummer.current += 1;
  }, []);
  const [endringsteller, setEndringsteller] = useState(0);
  const søkeordEndret = useCallback(() => setEndringsteller((n) => n + 1), []);

  const søkEndret = useCallback(() => {
    forkastVentendeLagretSøk();
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
  useEffect(() => {
    if (brukStandardsok !== true) {
      settSøkeord(hentSøkeordIFanen(domene, normaliserFilter(gjeldendeFilter)));
      if (
        new URLSearchParams(window.location.search).has(BRUK_STANDARDSØK_PARAM)
      ) {
        void setBrukStandardsok(null);
      }
    }
    // URL-en og sessionStorage finnes bare i nettleseren, så oppstarten må skje i en effekt.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartsjekkFerdig(true);
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
    settSøkeord(hentSøkeordIFanen(domene, filterIUrl));
    setUrlFraHistorikken(null);
  }, [
    urlFraHistorikken,
    historikkTidsavbrudd,
    domene,
    gjeldendeFilter,
    normaliserFilter,
    settSøkeord,
  ]);

  const venterPåFiltreOgSøkeord =
    !startsjekkFerdig || brukStandardsok === true || urlFraHistorikken !== null;

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
    lagreSøkeordIFanen(
      domene,
      normaliserFilter(gjeldendeFilter),
      gjeldendeSøkeord,
    );
    // Kjører bare når veilederen har endret noe. Filtrene og søkeordene leses fra samme render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endringsteller]);

  return {
    domene,
    gjeldendeLagretSøk,
    søkEndret,
    brukLagretSøk,
    venterPåFiltreOgSøkeord,
    normaliserFilter,
    sporHendelse: sporHendelseStabil,
  };
};

export type LagredeSøkTilstand = ReturnType<typeof useLagredeSøk>;
