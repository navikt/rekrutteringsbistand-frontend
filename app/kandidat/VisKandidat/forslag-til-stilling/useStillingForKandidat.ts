'use client';

import {
  useKandidatStillingssøk,
  YrkeJobbonskeStillingsSøkDTO,
} from '../../../api/kandidat-sok/useKandidatStillingssøk';
import {
  getNummerFraSted,
  stedmappingFraGammeltNummer,
} from '../../../api/stillings-sok/esFiltre/fylkeOgKommuneMapping';
import { useStillingsSøkFilter } from '../../../stilling/StillingsSøkContext';
import { StillingsStatusTyper } from '../../../stilling/components/StillingsSøkFilter/StatusFilter';
import React, { useRef } from 'react';

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
  const hasSetInitialData = useRef(false);
  const stillingsSøkContext = useStillingsSøkFilter();
  const { data: kandidatStillingssøk, isLoading: isKandidatLoading } =
    useKandidatStillingssøk(kandidatId);

  const processedData = React.useMemo(() => {
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

  React.useEffect(() => {
    if (processedData && !hasSetInitialData.current) {
      const { fylker, kommuner, yrkesønsker } = processedData;

      stillingsSøkContext.setFylker(fylker);
      stillingsSøkContext.setKommuner(kommuner);
      stillingsSøkContext.setKategori(yrkesønsker);
      stillingsSøkContext.setStatuser([StillingsStatusTyper.Publisert]);

      hasSetInitialData.current = true;
    }
  }, [processedData, stillingsSøkContext]);

  const isLoading =
    isKandidatLoading ||
    (!hasSetInitialData.current && kandidatStillingssøk !== null);

  return {
    kandidatStillingssøk,
    isLoading,
  };
};
