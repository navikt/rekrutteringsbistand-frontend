import { StillingsSøkPortefølje } from '../../stilling/stillingssøk-typer';
import {
  GeografiType,
  PamGeografi,
} from '../pam-geografi/typehead/lokasjoner/usePamGeografi';
import { esFritekstSøk } from './esFiltre/esFritekstSøk';
import { esFylkerOgKommuner } from './esFiltre/esFylkerOgKommuner';
import { esInkludering } from './esFiltre/esInkludering';
import { esKategori, esKategoriFormidling } from './esFiltre/esKategori';
import { esSorter } from './esFiltre/esSorter';
import { esStatuser } from './esFiltre/esStatuser';
import { esSynlighet } from './esFiltre/esSynlighet';
import { esErEier, esVariabler } from './esFiltre/esVariabler';

export const maksAntallTreffPerSøk = 20;

export const regnUtFørsteTreffFra = (
  side: number,
  antallTreffPerSide: number,
) => side * antallTreffPerSide - antallTreffPerSide;

export type StillingsSøkFilter = {
  side: number;
  fritekst: string[];
  statuser: string[];
  fylker: string[];
  kommuner: string[];
  portefølje: string;
  inkludering: string[];
  inkluderingUnderkategori: string[];
  kategori: string[];
  publisert: string[];
  sortering: string;
};

export function generateElasticSearchQuery(
  filter: StillingsSøkFilter,
  navIdent?: string,
  geografiData?: PamGeografi[],
  formidlinger?: boolean,
  finnStillingerForKandidat?: boolean,
) {
  const valgteFilter: any[] = [];
  const term: any[] = [];
  const sort: any = esSorter(filter.sortering);

  valgteFilter.push();

  if (!filter?.portefølje?.includes(StillingsSøkPortefølje.VIS_MINE)) {
    valgteFilter.push(esVariabler.skjulSlettetOgRejected);
  } else {
    valgteFilter.push(esErEier(navIdent));
  }

  if (filter?.statuser) {
    valgteFilter.push(...esStatuser(filter.statuser, navIdent));
  }

  if (
    filter.inkludering.length > 0 ||
    filter.inkluderingUnderkategori.length > 0
  ) {
    term.push(
      ...esInkludering({
        inkludering: filter.inkludering,
        inkluderingUnderkategori: filter.inkluderingUnderkategori,
      }),
    );
  }

  if (!formidlinger) {
    valgteFilter.push(...esKategori(filter.kategori));
  } else if (formidlinger) {
    valgteFilter.push(...esKategoriFormidling());
  }

  if (filter.publisert.length > 0) {
    valgteFilter.push(...esSynlighet(filter.publisert));
  }

  if (
    (geografiData && filter.fylker?.length > 0) ||
    filter.kommuner?.length > 0
  ) {
    const valgteFylker =
      geografiData
        ?.filter((geografi) => geografi.type === GeografiType.FYLKE)
        .filter(
          (fylke) =>
            fylke.lokasjon.fylkesnummer &&
            filter?.fylker.includes(fylke.lokasjon.fylkesnummer),
        ) ?? [];

    const valgteKommuner =
      geografiData
        ?.filter((geografi) => geografi.type === GeografiType.KOMMUNE)
        .filter((kommune) => {
          const kommuneErValgt =
            kommune.lokasjon.kommunenummer &&
            filter?.kommuner.includes(kommune.lokasjon.kommunenummer);

          return kommuneErValgt;
        }) ?? [];

    const kommunerDerKunFylkeErValgt = valgteFylker
      .filter(
        (fylke) =>
          fylke.type === GeografiType.FYLKE &&
          fylke.lokasjon.fylkesnummer &&
          !valgteKommuner.some(
            (k) => k.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer,
          ),
      )
      .flatMap(
        (fylke) =>
          geografiData?.filter(
            (g) =>
              g.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer &&
              g.type === GeografiType.KOMMUNE,
          ) ?? [],
      );

    const fylkerUtenValgteKommuner = valgteFylker.filter(
      (fylke) =>
        fylke.lokasjon.fylkesnummer &&
        !valgteKommuner.some(
          (k) => k.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer,
        ),
    );

    const valgteFylkerOgKommuner: PamGeografi[] = [
      ...fylkerUtenValgteKommuner,
      ...valgteKommuner,
      ...kommunerDerKunFylkeErValgt,
    ];

    if (valgteFylkerOgKommuner?.length) {
      valgteFilter.push(esFylkerOgKommuner(valgteFylkerOgKommuner));
    }
  }

  const inneholderVerdierMedBareTall: boolean = filter.fritekst.some((verdi) =>
    /^R?\d+$/.test(verdi),
  );

  const fritekstSøkestreng = filter.fritekst
    .map((fritekstOrd) => {
      const ord = fritekstOrd.split(' ').filter((it) => it.length > 1);

      return `(+${ord.map((ord) => ord.trim()).join(' +')})`;
    })
    .join(' | ');

  if (finnStillingerForKandidat) {
    const søkINummerFelter = inneholderVerdierMedBareTall;
    let søkefelt: string | undefined;

    if (!søkINummerFelter) {
      søkefelt = 'tekstfelter';
    }

    const byggFinnStillingerQuery = {
      size: maksAntallTreffPerSøk,
      from: regnUtFørsteTreffFra(filter.side, maksAntallTreffPerSøk),
      track_total_hits: true,
      query: {
        bool: {
          filter: [...term, ...valgteFilter],
          minimum_should_match: filter.fritekst.length ? '1' : '0',
          should: esFritekstSøk(fritekstSøkestreng, søkefelt),
        },
      },
      ...sort,
      ...(filter.fritekst && {
        aggs: {
          globalAggregering: {
            global: {},
            aggs: {
              felter: {
                filters: {
                  filters: {
                    tittel: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng, søkefelt),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                    annonsetekst: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng, søkefelt),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                    arbeidsgiver: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng, søkefelt),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                    ...(inneholderVerdierMedBareTall && {
                      annonsenummer: {
                        bool: {
                          should: esFritekstSøk(fritekstSøkestreng, søkefelt),
                          filter: [...term, ...valgteFilter],
                        },
                      },
                    }),
                  },
                },
              },
            },
          },
        },
      }),
    };
    return byggFinnStillingerQuery;
  } else {
    const byggQuery = {
      size: maksAntallTreffPerSøk,
      from: regnUtFørsteTreffFra(filter.side, maksAntallTreffPerSøk),
      track_total_hits: true,
      query: {
        bool: {
          filter: [...term, ...valgteFilter],
          minimum_should_match: filter.fritekst.length ? '1' : '0',
          should: esFritekstSøk(fritekstSøkestreng),
        },
      },
      ...sort,
      ...(filter.fritekst && {
        aggs: {
          globalAggregering: {
            global: {},
            aggs: {
              felter: {
                filters: {
                  filters: {
                    arbeidsgiver: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                    tittel: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                    annonsetekst: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                    annonsenummer: {
                      bool: {
                        should: esFritekstSøk(fritekstSøkestreng),
                        filter: [...term, ...valgteFilter],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    };

    return byggQuery;
  }
}
