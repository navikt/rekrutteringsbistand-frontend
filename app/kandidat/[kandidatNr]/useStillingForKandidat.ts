'use client';

import {
  useKandidatStillingssøk,
  YrkeJobbonskeStillingsSøkDTO,
} from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import {
  getNummerFraSted,
  stedmappingFraGammeltNummer,
} from '@/util/fylkeOgKommuneMapping';
import { useEffect, useMemo, useState } from 'react';

const hentFylkerFraJobbønsker = (
  geografijobbønskenummer: string[],
): string[] => {
  return Array.from(
    new Set(
      geografijobbønskenummer
        ?.filter((n) => n.length === 2 || n.length === 4)
        ?.map((n) => (n.length === 4 ? n.substring(0, 2) : n)),
    ),
  );
};

const hentKommunerFraJobbønsker = (
  geografijobbønskenummer: string[],
): string[] => {
  return geografijobbønskenummer?.filter((n) => n.length === 4) ?? [];
};

const hentYrkerFraJobbønsker = (
  yrkesønsker: YrkeJobbonskeStillingsSøkDTO[],
): string[] => {
  return [
    ...new Set(
      yrkesønsker
        ?.flatMap((yrkesønske) => yrkesønske.sokeTitler ?? [])
        ?.filter((tittel): tittel is string => tittel != null),
    ),
  ];
};

export const konverterStederTilNåværendeKoder = (
  geografikoder: (string | null)[],
): string[] => {
  const konverterteKoder = geografikoder
    ?.filter((kode): kode is string => kode !== null)
    ?.map((kode) => {
      const nyekoder = stedmappingFraGammeltNummer.get(kode)?.nummer || kode;
      return nyekoder.length > 4 ? nyekoder.substring(0, 4) : nyekoder;
    });

  const fylkesKoder = new Set(
    konverterteKoder?.filter((kode) => kode.length === 2) ?? [],
  );

  return (
    konverterteKoder?.filter((kode) => {
      return (
        !Array.from(fylkesKoder).some(
          (fylkesKode) => kode.startsWith(fylkesKode) && kode !== fylkesKode,
        ) && kode.length > 0
      );
    }) ?? []
  );
};

export const useStillingForKandidat = (kandidatId: string | null) => {
  // Bruk state i stedet for ref for å indikere at initial data er satt
  const [harSattInitialData, setHarSattInitialData] = useState(false);
  const stillingsSøkContext = useStillingsSøkFilter();
  const { data: kandidatStillingssøk, isLoading: isKandidatLoading } =
    useKandidatStillingssøk(kandidatId);

  const processedData = useMemo(() => {
    if (!kandidatStillingssøk) return null;

    const { geografiJobbonsker, yrkeJobbonskerObj, kommunenummerstring } =
      kandidatStillingssøk;

    const geografikoder =
      geografiJobbonsker?.length === 0
        ? [kommunenummerstring]
        : geografiJobbonsker
            ?.map((g) => getNummerFraSted(g.geografiKode))
            ?.filter((kode): kode is string => kode !== null);

    const konverterteGeografikoder =
      konverterStederTilNåværendeKoder(geografikoder);

    return {
      fylker: hentFylkerFraJobbønsker(konverterteGeografikoder ?? []),
      kommuner: hentKommunerFraJobbønsker(konverterteGeografikoder ?? []),
      yrkesønsker: hentYrkerFraJobbønsker(yrkeJobbonskerObj ?? []),
    };
  }, [kandidatStillingssøk]);

  useEffect(() => {
    if (processedData && !harSattInitialData) {
      const { fylker, kommuner, yrkesønsker } = processedData;
      // Synkroniserer eksternt system (context) MED utledet data
      stillingsSøkContext.setFylker(fylker);
      stillingsSøkContext.setKommuner(kommuner);
      stillingsSøkContext.setFritekstListe(yrkesønsker);
      stillingsSøkContext.setStatuser([VisningsStatus.ApenForSokere]);

      const t = setTimeout(() => setHarSattInitialData(true), 0);
      return () => clearTimeout(t);
    }
  }, [processedData, harSattInitialData, stillingsSøkContext]);

  const isLoading =
    isKandidatLoading || (kandidatStillingssøk !== null && !harSattInitialData);

  return {
    kandidatStillingssøk,
    isLoading,
  };
};
