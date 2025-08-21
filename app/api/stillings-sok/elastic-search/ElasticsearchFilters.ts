import { StillingsStatusTyper } from '../../../stilling/components/StillingsSøkFilter/StatusFilter';
import { Stillingskategori } from '../../../stilling/stilling-typer';
import { StillingsSøkPortefølje } from '../../../stilling/stillingssøk-typer';
import {
  GeografiType,
  PamGeografi,
} from '../../pam-geografi/typehead/lokasjoner/usePamGeografi';
// Import only the geographic mapping data that we need
import {
  formaterStedsnavn,
  stedmappingFraNyttNavn,
  stedmappingFraNyttNummer,
} from '../esFiltre/fylkeOgKommuneMapping';

export type StillingsSøkFilterInkludering = {
  inkludering: string[];
  inkluderingUnderkategori: string[];
};

/**
 * Elasticsearch Filter Helper Functions
 *
 * Inneholder alle filter-metoder som tidligere var spredt over ulike esFiltre-filer.
 * Alle metodene er statiske for enkel bruk og testing.
 */
export class ElasticsearchFilters {
  // ==========================================
  // BASIC FILTERS
  // ==========================================

  /**
   * Grunnleggende variabler - skjuler slettede og rejected stillinger
   * Erstatter: esVariabler.skjulSlettetOgRejected
   */
  static getBasicVariables() {
    return {
      bool: {
        must_not: [
          {
            term: {
              'stilling.status': 'REJECTED',
            },
          },
          {
            term: {
              'stilling.status': 'DELETED',
            },
          },
        ],
        must: [
          {
            term: {
              'stilling.administration.status': 'DONE',
            },
          },
          {
            exists: {
              field: 'stilling.publishedByAdmin',
            },
          },
          {
            range: {
              'stilling.published': {
                lte: 'now/d',
              },
            },
          },
        ],
      },
    };
  }

  /**
   * Eier-basert filtrering
   * Erstatter: esErEier(navIdent)
   */
  static getOwnerFilter(navIdent: string | undefined) {
    return navIdent
      ? {
          bool: {
            should: [
              {
                term: {
                  'stilling.administration.navIdent': navIdent,
                },
              },
              {
                term: {
                  'stillingsinfo.eierNavident': navIdent,
                },
              },
            ],
            minimum_should_match: 1,
          },
        }
      : null;
  }

  // ==========================================
  // STATUS FILTERS
  // ==========================================

  /**
   * Status-basert filtrering
   * Erstatter: esStatuser(statuser, navIdent)
   */
  static getStatusFilters(statuser: string[], navIdent?: string) {
    const ingenFiltreValgt = statuser.length === 0;
    const alleFiltreValgt =
      statuser.length === Object.keys(StillingsStatusTyper).length;

    // Publisert filter
    const publisert = {
      bool: {
        should: [
          {
            range: {
              'stilling.expires': {
                gte: 'now/d',
              },
            },
          },
          {
            bool: {
              must_not: {
                exists: {
                  field: 'stilling.expires',
                },
              },
            },
          },
        ],
      },
    };

    // Stoppet filter
    const stoppet = {
      term: {
        'stilling.status': 'STOPPED',
      },
    };

    // Utløpt filter
    const utløpt = {
      range: {
        'stilling.expires': {
          lt: 'now/d',
        },
      },
    };

    // Alle stillinger (publisert + stoppet + utløpt)
    const alleStillinger = [
      {
        bool: {
          should: [publisert, stoppet, utløpt],
        },
      },
    ];

    if (ingenFiltreValgt || alleFiltreValgt) {
      if (navIdent) {
        return [];
      }
      return alleStillinger;
    }

    const statusSpørringer: any[] = [];

    if (statuser.includes(StillingsStatusTyper.Publisert)) {
      statusSpørringer.push(publisert);
    }

    if (statuser.includes(StillingsStatusTyper.Stoppet)) {
      statusSpørringer.push(stoppet);
    }

    if (statuser.includes(StillingsStatusTyper.Utløpt)) {
      statusSpørringer.push(utløpt);
    }

    return [
      {
        bool: {
          should: statusSpørringer,
        },
      },
    ];
  }

  // ==========================================
  // VISIBILITY & PORTFOLIO FILTERS
  // ==========================================

  /**
   * Synlighet/portfolio-basert filtrering
   * Erstatter: esSynlighet(portefølje)
   */
  static getVisibilityFilters(portefølje: StillingsSøkPortefølje) {
    const synlighetFilter: any[] = [
      {
        bool: {
          must_not: [
            {
              term: {
                'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
              },
            },
            {
              term: {
                'stillingsinfo.stillingskategori': 'FORMIDLING',
              },
            },
          ],
        },
      },
    ];

    if (portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO) {
      synlighetFilter.push({
        term: {
          'stilling.privacy': 'SHOW_ALL',
        },
      });
    }

    return synlighetFilter;
  }

  // ==========================================
  // CATEGORY FILTERS
  // ==========================================

  /**
   * Kategori-basert filtrering
   * Erstatter: esKategori(kategori)
   */
  static getCategoryFilters(kategori: string[]) {
    const filter = [];

    if (
      kategori.length === 0 ||
      (kategori.includes(Stillingskategori.Stilling) &&
        kategori.includes(Stillingskategori.Jobbmesse))
    ) {
      filter.push({
        bool: {
          must_not: [
            {
              term: {
                'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
              },
            },
            {
              term: {
                'stillingsinfo.stillingskategori': 'FORMIDLING',
              },
            },
          ],
        },
      });
    }

    if (kategori.includes(Stillingskategori.Jobbmesse)) {
      filter.push({
        bool: {
          should: [
            {
              term: {
                'stillingsinfo.stillingskategori': 'JOBBMESSE',
              },
            },
          ],
        },
      });
    }

    if (
      kategori.includes(Stillingskategori.Stilling) &&
      !kategori.includes(Stillingskategori.Jobbmesse)
    ) {
      filter.push({
        bool: {
          must_not: [
            {
              term: {
                'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
              },
            },
            {
              term: {
                'stillingsinfo.stillingskategori': 'JOBBMESSE',
              },
            },
            {
              term: {
                'stillingsinfo.stillingskategori': 'FORMIDLING',
              },
            },
          ],
        },
      });
    }

    return filter;
  }

  /**
   * Formidling kategori filter
   * Erstatter: esKategoriFormidling()
   */
  static getFormidlingCategoryFilters() {
    return [{ term: { 'stillingsinfo.stillingskategori': 'FORMIDLING' } }];
  }

  // ==========================================
  // GEOGRAPHIC FILTERS
  // ==========================================

  /**
   * Fylke og kommune filtrering
   * Erstatter: esFylkerOgKommuner(valgteFylkerOgKommuner, geografiData)
   */
  static getGeographicFilters(
    valgteFylkerOgKommuner: Array<{
      navn: string;
      type: GeografiType;
      lokasjon: any;
    }>,
    geografiData?: PamGeografi[],
  ) {
    const fylkeSøk = valgteFylkerOgKommuner.filter(
      (f) => f.type === GeografiType.FYLKE,
    );

    const fylker = valgteFylkerOgKommuner.filter(
      (f) => f.type === GeografiType.FYLKE,
    );

    if (
      fylker.length === 0 &&
      valgteFylkerOgKommuner.filter(
        (kommune) => kommune.type === GeografiType.KOMMUNE,
      ).length === 0
    )
      return null;

    const kommunerInkludertGamleKoder = valgteFylkerOgKommuner
      .filter((kommune) => kommune.type === GeografiType.KOMMUNE)
      .flatMap((kommune) => {
        const ekstraSteder =
          kommune.lokasjon.kommunenummer &&
          stedmappingFraNyttNummer
            .get(kommune.lokasjon.kommunenummer)
            ?.map((sted) => {
              return sted.nummer;
            });
        return [kommune.lokasjon.kommunenummer, ...(ekstraSteder || [])];
      });

    const fylkerInkludertGamleNavn = new Set(
      [...fylkeSøk].flatMap((fylke) => {
        const ekstraNavn =
          stedmappingFraNyttNavn
            .get(formaterStedsnavn(fylke.navn))
            ?.map((sted) => sted.navn.toUpperCase()) || [];
        return [fylke.navn, ...ekstraNavn];
      }),
    );

    const shouldFylker =
      fylkerInkludertGamleNavn.size === 0
        ? []
        : [
            {
              terms: {
                'stilling.locations.county.keyword': Array.from(
                  fylkerInkludertGamleNavn,
                ).map((fylke) => fylke.toUpperCase()),
              },
            },
          ];

    const shouldKommuner =
      kommunerInkludertGamleKoder.length === 0
        ? []
        : [
            {
              terms: {
                'stilling.locations.municipalCode': kommunerInkludertGamleKoder,
              },
            },
          ];

    return {
      nested: {
        path: 'stilling.locations',
        query: {
          bool: {
            should: [...shouldFylker, ...shouldKommuner],
          },
        },
      },
    };
  }

  // ==========================================
  // SEARCH & TEXT FILTERS
  // ==========================================

  /**
   * Fritekst søk
   * Erstatter: esFritekstSøk(fritekst)
   */
  static getFullTextSearch(fritekst: string[]) {
    if (!fritekst || fritekst.length === 0) {
      return [];
    }

    const fritekstString = fritekst.join(' ');

    return [
      {
        multi_match: {
          query: fritekstString,
          type: 'cross_fields',
          fields: [
            'stilling.title^2',
            'stilling.businessName^1.5',
            'stilling.source^1.5',
            'stilling.locationList.city^1.5',
            'stilling.locationList.county^1.5',
            'stilling.categoryList.name^1.2',
            'stilling.occupationList.name^1.2',
            'stilling.jobDescription',
            'stilling.adText',
          ],
          operator: 'and',
        },
      },
    ];
  }

  // ==========================================
  // INCLUSION FILTERS
  // ==========================================

  /**
   * Inkludering filter
   * Erstatter: esInkludering(filter)
   */
  static getInclusionFilters(filter: StillingsSøkFilterInkludering) {
    return [
      {
        terms: {
          'stilling.properties.tags': filter.inkludering,
        },
      },
    ];
  }

  // ==========================================
  // SORTING
  // ==========================================

  /**
   * Sortering
   * Erstatter: esSorter(sortering)
   */
  static getSorting(sortering: string) {
    const sorteringsalternativer: { [key: string]: any } = {
      publisert: [
        {
          'stilling.published': {
            order: 'desc',
          },
        },
      ],
      utløpsdato: [
        {
          'stilling.expires': {
            order: 'asc',
          },
        },
      ],
      relevans: [], // Default Elasticsearch scoring
    };

    return sorteringsalternativer[sortering] || sorteringsalternativer.relevans;
  }
}
