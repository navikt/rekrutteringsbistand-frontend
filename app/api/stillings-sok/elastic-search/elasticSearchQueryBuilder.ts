import { IStillingsSøkContext } from '../../../stilling/StillingsSøkContext';
import { PamGeografi } from '../../pam-geografi/typehead/lokasjoner/usePamGeografi';

export const maksAntallTreffPerSøk = 20;

export const regnUtFørsteTreffFra = (
  side: number,
  antallTreffPerSide: number,
) => side * antallTreffPerSide - antallTreffPerSide;

interface ElasticSearchQueryBuilderParams {
  filter: IStillingsSøkContext;
  eierNavKontorEnhetId?: string;
  navIdent?: string;
  geografiData?: PamGeografi[];
  formidlinger?: boolean;
  finnStillingerForKandidat?: boolean;
}

/**
 * ElasticSearch Query Builder
 *
 * Fokusert på query-byggefunksjonalitet. Filter-logikk er separert til ElasticsearchFilters.
 *
 * Forklaring av Elasticsearch bool query struktur:
 * - filter: Dokumenter MÅ matche disse kriteriene (påvirker ikke score)
 * - must: Dokumenter MÅ matche disse kriteriene og påvirker score
 * - should: Dokumenter BØR matche disse kriteriene (påvirker score)
 * - must_not: Dokumenter MÅ IKKE matche disse kriteriene
 *
 * API-metoder støtter to bruksmønstre:
 * 1. Enkle felt/verdi-par for term queries:
 *    - addFilter(field, value) -> { term: { field: value } }
 *    - addMust(field, value) -> { term: { field: value } }
 *    - addShould(field, value) -> { term: { field: value } }
 *    - addMustNot(field, value) -> { term: { field: value } }
 *
 * 2. Komplekse query-objekter:
 *    - addFilter(queryObject) -> legger til hele objektet
 *    - addMust(queryObject) -> legger til hele objektet
 *    - addShould(queryObject) -> legger til hele objektet
 *    - addMustNot(queryObject) -> legger til hele objektet
 *
 * Spesialiserte metoder:
 * - addExists(field) -> { exists: { field: field } }
 * - addRange(field, conditions) -> { range: { field: conditions } }
 * - addSimpleQueryString(query, fields, operator) -> { simple_query_string: {...} }
 * - addFritekstSøk(fritekst, felt) -> bygger simple_query_string direkte med prosessert søkestreng
 * - addBoolFilter(boolQuery) -> { bool: {...} } for komplekse nested queries
 * - setMinimumShouldMatch(value) -> setter minimum_should_match for should-clauses
 *
 * Eksempler:
 * builder.addFilter('status', 'AKTIV');
 * builder.addMustNot('type', 'DELETED');
 * builder.addExists('stillingsinfo');
 * builder.addRange('created', { gte: '2024-01-01', lte: 'now/d' });
 * builder.addSimpleQueryString('test søk', ['tittel', 'annonsetekst'], 'and');
 * builder.addFritekstSøk('utvikler', 'tittel');
 * builder.addBoolFilter({ must: [{ term: { status: 'ACTIVE' } }], should: [{ term: { type: 'FULL' } }] });
 * builder.setMinimumShouldMatch(1);
 */
export class ElasticSearchQueryBuilder {
  private filterClauses: any[] = [];
  private mustClauses: any[] = [];
  private shouldClauses: any[] = [];
  private mustNotClauses: any[] = [];
  private sorting: any[] = [];
  private aggregations: any = {};
  private minimumShouldMatch?: string | number;

  /**
   * Legger til filter-clause (MÅ matche, påvirker ikke score)
   */
  addFilter(clause: any): this;
  addFilter(field: string, value: any): this;
  addFilter(clauseOrField: any, value?: any): this {
    if (typeof clauseOrField === 'string' && value !== undefined) {
      // Når kalt med felt-navn og verdi
      this.filterClauses.push({
        term: {
          [clauseOrField]: value,
        },
      });
    } else {
      // Når kalt med eksisterende clause objekt
      const clause = clauseOrField;
      if (Array.isArray(clause)) {
        this.filterClauses.push(...clause);
      } else if (clause) {
        this.filterClauses.push(clause);
      }
    }
    return this;
  }

  /**
   * Legger til must-clause (MÅ matche og påvirker score)
   */
  addMust(clause: any): this;
  addMust(field: string, value: any): this;
  addMust(clauseOrField: any, value?: any): this {
    if (typeof clauseOrField === 'string' && value !== undefined) {
      // Når kalt med felt-navn og verdi
      this.mustClauses.push({
        term: {
          [clauseOrField]: value,
        },
      });
    } else {
      // Når kalt med eksisterende clause objekt
      const clause = clauseOrField;
      if (Array.isArray(clause)) {
        this.mustClauses.push(...clause);
      } else if (clause) {
        this.mustClauses.push(clause);
      }
    }
    return this;
  }

  /**
   * Legger til should-clause (BØR matche)
   */
  addShould(clause: any): this;
  addShould(field: string, value: any): this;
  addShould(clauseOrField: any, value?: any): this {
    if (typeof clauseOrField === 'string' && value !== undefined) {
      // Når kalt med felt-navn og verdi
      this.shouldClauses.push({
        term: {
          [clauseOrField]: value,
        },
      });
    } else {
      // Når kalt med eksisterende clause objekt
      const clause = clauseOrField;
      if (Array.isArray(clause)) {
        this.shouldClauses.push(...clause);
      } else if (clause) {
        this.shouldClauses.push(clause);
      }
    }
    return this;
  }

  /**
   * Legger til must_not-clause (MÅ IKKE matche)
   */
  addMustNot(clause: any): this;
  addMustNot(field: string, value: any): this;
  addMustNot(clauseOrField: any, value?: any): this {
    if (typeof clauseOrField === 'string' && value !== undefined) {
      // Når kalt med felt-navn og verdi
      this.mustNotClauses.push({
        term: {
          [clauseOrField]: value,
        },
      });
    } else {
      // Når kalt med eksisterende clause objekt
      const clause = clauseOrField;
      if (Array.isArray(clause)) {
        this.mustNotClauses.push(...clause);
      } else if (clause) {
        this.mustNotClauses.push(clause);
      }
    }
    return this;
  }

  /**
   * Legger til exists-clause som filter (MÅ ha feltet)
   */
  addExists(field: string): this {
    this.filterClauses.push({
      exists: {
        field: field,
      },
    });
    return this;
  }

  /**
   * Legger til range-clause som filter
   */
  addRange(
    field: string,
    rangeConditions: { gte?: any; gt?: any; lte?: any; lt?: any },
  ): this {
    this.filterClauses.push({
      range: {
        [field]: rangeConditions,
      },
    });
    return this;
  }

  /**
   * Legger til en kompleks bool-query som filter
   */
  addBoolFilter(boolQuery: {
    must?: any[];
    should?: any[];
    must_not?: any[];
    filter?: any[];
    minimum_should_match?: string | number;
  }): this {
    this.filterClauses.push({
      bool: boolQuery,
    });
    return this;
  }

  /**
   * Setter minimum_should_match for should-clauses
   */
  setMinimumShouldMatch(minimumShouldMatch: string | number): this {
    this.minimumShouldMatch = minimumShouldMatch;
    return this;
  }

  /**
   * Legger til simple_query_string som should-clause
   */
  addSimpleQueryString(
    query: string,
    fields: string[],
    defaultOperator: 'and' | 'or' = 'and',
  ): this {
    if (query && query.length > 0) {
      this.shouldClauses.push({
        simple_query_string: {
          query: query,
          fields: fields,
          default_operator: defaultOperator,
        },
      });
    }
    return this;
  }

  /**
   * Legger til fritekst-søk med prosessert søkestreng
   * Tar imot en allerede prosessert søkestreng og bygger simple_query_string direkte
   */
  addFritekstSøk(fritekst: string, felt?: string): this {
    if (!fritekst || fritekst.length < 1) return this;

    const feltManSkalSøkeI: string[] = [];

    if (felt === 'tekstfelter') {
      feltManSkalSøkeI.push(
        'stilling.adtext_no^0.5',
        'stilling.tittel',
        'stilling.employer.name',
        'stilling.properties.jobtitle',
        'stilling.properties.arbeidsplassenoccupation',
        'stilling.properties.keywords',
      );
    } else {
      feltManSkalSøkeI.push(
        'stilling.adtext_no^0.5',
        'stilling.tittel',
        'stilling.annonsenr',
        'stilling.employer.name',
        'stilling.employer.orgnr',
        'stilling.properties.jobtitle',
        'stilling.properties.arbeidsplassenoccupation',
        'stilling.properties.keywords',
      );
    }

    this.shouldClauses.push({
      simple_query_string: {
        query: fritekst,
        fields: feltManSkalSøkeI,
        default_operator: 'and',
      },
    });

    return this;
  }

  /**
   * Setter sorteringsalternativer
   */
  setSorting(sort: any): this {
    this.sorting = sort;
    return this;
  }

  /**
   * Setter aggregering
   */
  setAggregations(aggs: any): this {
    this.aggregations = aggs;
    return this;
  }

  /**
   * Bygger standard aggregering som alltid skal være med
   * Inkluderer fritekst-søk i should-delen hvis det finnes fritekst
   * Matcher den fungerende implementasjonen fra stillingssøkElasticSearchQuery
   */
  buildStandardAggregation(fritekstSøkestreng?: string): any {
    // Hent hele bool-strukturen for bruk i aggregeringer
    const allFilters = this.buildFilters();

    // Hjelpefunksjon for å bygge fritekst should-clauses for et spesifikt felt
    const buildFritekstShouldClause = (fritekst: string, felt: string) => {
      if (!fritekst || fritekst.length < 1) return [];

      const feltManSkalSøkeI: string[] = [];
      if (felt === 'tekstfelter') {
        feltManSkalSøkeI.push(
          'stilling.adtext_no^0.5',
          'stilling.tittel',
          'stilling.employer.name',
          'stilling.properties.jobtitle',
          'stilling.properties.arbeidsplassenoccupation',
          'stilling.properties.keywords',
        );
      } else {
        feltManSkalSøkeI.push(
          'stilling.adtext_no^0.5',
          'stilling.tittel',
          'stilling.annonsenr',
          'stilling.employer.name',
          'stilling.employer.orgnr',
          'stilling.properties.jobtitle',
          'stilling.properties.arbeidsplassenoccupation',
          'stilling.properties.keywords',
        );
      }

      return {
        simple_query_string: {
          query: fritekst,
          fields: feltManSkalSøkeI,
          default_operator: 'and',
        },
      };
    };

    // Bestem should-clauses basert på om det er fritekst-søk
    const shouldClauses =
      fritekstSøkestreng && fritekstSøkestreng.length > 0
        ? {
            arbeidsgiver: buildFritekstShouldClause(
              fritekstSøkestreng,
              'arbeidsgiver',
            ),
            tittel: buildFritekstShouldClause(fritekstSøkestreng, 'tittel'),
            annonsetekst: buildFritekstShouldClause(
              fritekstSøkestreng,
              'annonsetekst',
            ),
            annonsenummer: buildFritekstShouldClause(
              fritekstSøkestreng,
              'annonsenummer',
            ),
          }
        : {
            arbeidsgiver: [],
            tittel: [],
            annonsetekst: [],
            annonsenummer: [],
          };

    return {
      globalAggregering: {
        global: {},
        aggs: {
          felter: {
            filters: {
              filters: {
                arbeidsgiver: {
                  bool: {
                    should: shouldClauses.arbeidsgiver,
                    ...allFilters,
                  },
                },
                tittel: {
                  bool: {
                    should: shouldClauses.tittel,
                    ...allFilters,
                  },
                },
                annonsetekst: {
                  bool: {
                    should: shouldClauses.annonsetekst,
                    ...allFilters,
                  },
                },
                annonsenummer: {
                  bool: {
                    should: shouldClauses.annonsenummer,
                    ...allFilters,
                  },
                },
              },
            },
          },
        },
      },
    };
  } /**
   * Setter standard aggregering som alltid skal være med
   * Inkluderer fritekst-søk hvis det finnes
   */
  setStandardAggregation(fritekst?: string[]): this {
    const fritekstSøkestreng =
      fritekst && fritekst.length > 0 ? fritekst.join(' ') : undefined;

    const standardAggs = this.buildStandardAggregation(fritekstSøkestreng);

    // Kombiner med eksisterende aggregeringer
    this.aggregations = {
      ...this.aggregations,
      ...standardAggs,
    };
    return this;
  }

  /**
   * Bygger filter-delen av query (brukes når det er filter-kriterier)
   */
  private buildFilters(): any {
    const filters: any = {};

    if (this.filterClauses.length > 0) {
      filters.filter = this.filterClauses;
    }

    if (this.mustClauses.length > 0) {
      filters.must = this.mustClauses;
    }

    if (this.shouldClauses.length > 0) {
      filters.should = this.shouldClauses;

      // Bruk eksplisitt satt minimum_should_match hvis den finnes
      if (this.minimumShouldMatch !== undefined) {
        filters.minimum_should_match = this.minimumShouldMatch;
      } else if (
        this.mustClauses.length === 0 &&
        this.filterClauses.length === 0
      ) {
        // Hvis vi har should-clauses, krever vi at minst én matcher (kun hvis ingen must/filter)
        filters.minimum_should_match = 1;
      }
    }

    if (this.mustNotClauses.length > 0) {
      filters.must_not = this.mustNotClauses;
    }

    return filters;
  }

  /**
   * Bygger den endelige Elasticsearch query
   */
  build(size: number = maksAntallTreffPerSøk, from: number = 0): any {
    const filters = this.buildFilters();

    const query: any = {
      size,
      from,
      track_total_hits: true,
    };

    // Hvis vi har noen filter/must/should/must_not clauses
    if (Object.keys(filters).length > 0) {
      query.query = {
        bool: filters,
      };
    } else {
      // Hvis ingen spesifikke filtre, match alle dokumenter
      query.query = {
        match_all: {},
      };
    }

    // Legg til sortering hvis spesifisert
    if (this.sorting && this.sorting.length > 0) {
      // Hvis det bare er ett sorteringselement, bruk det direkte
      // Hvis det er flere, bruk array
      query.sort = this.sorting.length === 1 ? this.sorting[0] : this.sorting;
    } else {
    }

    // Legg til aggregering hvis spesifisert
    if (Object.keys(this.aggregations).length > 0) {
      query.aggs = this.aggregations;
    }

    return query;
  }
}
