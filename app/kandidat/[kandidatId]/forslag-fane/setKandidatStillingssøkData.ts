// import { sendEvent } from 'felles/amplitude';
// import { Jobbønske } from 'felles/domene/kandidat/Jobbprofil';
// import { useEffect, useState } from 'react';
// import {
//     KandidatStillingssøkDTO,
//     useKandidatStillingssøk,
//     GeografiØnske,
// } from '../../../api/kandidat-søk-api/kandidatStillingssøk';
// import { Status } from '../filter/om-annonsen/Annonsestatus';
// import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
// import useNavigering from '../useNavigering';
// import { QueryParam } from '../utils/urlUtils';
// import { getNummerFraSted, stedmappingFraGammeltNummer } from 'felles/MappingSted';

import {
  useKandidatStillingssøk,
  YrkeJobbonskeStillingsSøkDTO,
} from '../../../api/kandidat-sok/useKandidatStillingssøk';
import {
  getNummerFraSted,
  stedmappingFraGammeltNummer,
} from '../../../api/stillings-sok/esFiltre/fylkeOgKommuneMapping';
import { useStillingsSøkFilter } from '../../../stillings-sok/StillingsSøkContext';
import { StillingsStatusTyper } from '../../../stillings-sok/components/StillingsSøkFilter/StatusFilter';

const hentFylkerFraJobbønsker = (
  geografijobbønskenummer: string[],
): string[] => {
  return Array.from(
    new Set(
      geografijobbønskenummer
        .filter((n) => n.length === 2 || n.length === 4)
        .map((n) => (n.length === 4 ? n.substring(0, 2) : n)),
    ),
  );
};

const hentKommunerFraJobbønsker = (
  geografijobbønskenummer: string[],
): string[] => {
  return geografijobbønskenummer.filter((n) => n.length === 4);
};

const hentYrkerFraJobbønsker = (
  yrkesønsker: YrkeJobbonskeStillingsSøkDTO[],
): string[] => {
  return [
    ...new Set(
      yrkesønsker
        .flatMap((yrkesønske) => yrkesønske.sokeTitler ?? [])
        .filter((tittel): tittel is string => tittel != null),
    ),
  ];
};

const konverterStederTilNåværendeKoder = (
  geografikoder: (string | null)[],
): string[] => {
  const konverterteKoder = geografikoder
    .filter((kode): kode is string => kode !== null)
    .map((kode) => {
      const nyekoder = stedmappingFraGammeltNummer.get(kode)?.nummer || kode;
      return nyekoder.length > 4 ? nyekoder.substring(0, 4) : nyekoder;
    });

  const fylkesKoder = new Set(
    konverterteKoder.filter((kode) => kode.length === 2),
  );

  return konverterteKoder.filter((kode) => {
    return (
      !Array.from(fylkesKoder).some(
        (fylkesKode) => kode.startsWith(fylkesKode) && kode !== fylkesKode,
      ) && kode.length > 0
    );
  });
};

export const setKandidatStillingssøkData = (kandidatId: string) => {
  // const { searchParams, navigate } = useNavigering();

  console.log('🎺 kandidatId', kandidatId);
  console.log('🎺 er her');
  const stillingsSøkContext = useStillingsSøkFilter();

  const swrHook = useKandidatStillingssøk(kandidatId);

  const kandidatStillingssøk = swrHook.data;
  if (kandidatStillingssøk) {
    const { geografiJobbonsker, yrkeJobbonskerObj, kommunenummerstring } =
      kandidatStillingssøk;

    const geografikoder =
      geografiJobbonsker.length === 0
        ? [kommunenummerstring]
        : geografiJobbonsker
            .map((g) => getNummerFraSted(g.geografiKode))
            .filter((kode): kode is string => kode !== null);

    const konverterteGeografikoder =
      konverterStederTilNåværendeKoder(geografikoder);

    const fylker: string[] = hentFylkerFraJobbønsker(konverterteGeografikoder);
    const kommuner = hentKommunerFraJobbønsker(konverterteGeografikoder);
    const yrkesønsker = hentYrkerFraJobbønsker(yrkeJobbonskerObj);

    if (fylker) stillingsSøkContext.setFylker(fylker);
    if (kommuner) stillingsSøkContext.setKommuner(kommuner);
    if (yrkesønsker) stillingsSøkContext.setKategori(yrkesønsker);
    stillingsSøkContext.setStatuser([StillingsStatusTyper.Publisert]);
  }
};

//     if (searchParams.get(QueryParam.BrukKriterierFraKandidat) === 'true') {
//       const søk = new URLSearchParams();

//       if (fylker.length > 0) søk.set(QueryParam.Fylker, fylker.join(','));
//       if (kommuner.length > 0)
//         søk.set(QueryParam.Kommuner, kommuner.join(','));
//       if (yrkesønsker.length > 0)
//         søk.set(QueryParam.Tekst, yrkesønsker.join(','));

//       søk.set(QueryParam.Statuser, Status.Publisert);
//       søk.set(QueryParam.Publisert, Publisert.Intern);

//       sendEvent('stillingssøk', 'kontekst_av_kandidat', {
//         antallFylker: fylker.length,
//         antallKommuner: kommuner.length,
//         antallYrkesønsker: yrkesønsker.length,
//       });

//       navigate({ search: søk.toString() }, { replace: true });
//     }
//   }
// }, [kandidatnr, navigate, searchParams, swrHook, kandidatStillingssøk]);

//   return {
//     ...swrHook,
//     hentetGeografiFraBosted,
//     manglerØnsketYrke,
//     kandidatStillingssøk,
//   };
// };
// };
