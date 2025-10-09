export const maksAntallTreffPerSøk = 20;

export const regnUtFørsteTreffFra = (
  side: number,
  antallTreffPerSide: number,
) => side * antallTreffPerSide - antallTreffPerSide;

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
  private postFilterClause: any | null = null;
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
        'stilling.uuid',
        'stilling.tittel',
        'stilling.employer.name',
        'stilling.properties.jobtitle',
        'stilling.properties.arbeidsplassenoccupation',
        'stilling.properties.keywords',
      );
    } else {
      feltManSkalSøkeI.push(
        'stilling.adtext_no^0.5',
        'stilling.uuid',
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
   * Setter post_filter (påvirker bare treff, ikke aggregasjoner)
   */
  setPostFilter(clause: any): this {
    this.postFilterClause = clause;
    return this;
  }

  /**
   * Bygger standard aggregering som alltid skal være med
   * Inkluderer fritekst-søk i should-delen hvis det finnes fritekst
   * Matcher den fungerende implementasjonen fra stillingssøkElasticSearchQuery
   */
  buildStandardAggregation(
    navIdent?: string,
    kontorEnhetId?: string,
    fritekstSøkestreng?: string,
    opts?: {
      formidlinger?: boolean;
      utenOppdrag?: boolean;
      includePortfolioInCounts?: boolean;
    },
  ): any {
    // Hent hele bool-strukturen for bruk i aggregeringer
    const allFilters = this.buildFilters();

    // Fjern portefølje-filtre (skal ikke tas med i tab-aggregatene siden hver tab definerer porteføljen selv)
    const portfolioFields = new Set([
      'stilling.administration.navIdent',
      'stillingsinfo.eierNavident',
      'stillingsinfo.eierNavKontorEnhetId',
    ]);
    // Rekursiv pruning av alle clauses som refererer til portefølje-felt
    const pruneClause = (clause: any): any | null => {
      if (!clause) return clause;
      // Enkel term
      if (clause.term && typeof clause.term === 'object') {
        const fieldName = Object.keys(clause.term)[0];
        if (portfolioFields.has(fieldName)) return null; // fjern
        return clause; // behold
      }
      // Fjern exists stillingsinfo (INTERN-spesifikt) fra "globale" filtre, vi bygger dette eksplisitt per fane
      if (clause.exists && clause.exists.field === 'stillingsinfo') {
        return null;
      }
      // Bool-struktur
      if (clause.bool && typeof clause.bool === 'object') {
        const b = clause.bool;
        const keys: Array<'filter' | 'must' | 'should' | 'must_not'> = [
          'filter',
          'must',
          'should',
          'must_not',
        ];
        const newBool: any = {};
        // Identifiser publiserings-bool (must inneholder DONE + publishedByAdmin + range published) og must_not REJECTED/DELETED
        const isPubliseringsBool = () => {
          if (!Array.isArray(b.must)) return false;
          const hasDone = b.must.some(
            (m: any) =>
              m.term && m.term['stilling.administration.status'] === 'DONE',
          );
          const hasPublishedByAdmin = b.must.some(
            (m: any) =>
              m.exists && m.exists.field === 'stilling.publishedByAdmin',
          );
          const hasRange = b.must.some(
            (m: any) => m.range && m.range['stilling.published'],
          );
          const hasRejectedDeleted =
            Array.isArray(b.must_not) &&
            b.must_not.some(
              (mn: any) =>
                mn.term &&
                (mn.term['stilling.status'] === 'REJECTED' ||
                  mn.term['stilling.status'] === 'DELETED'),
            );
          return (
            hasDone && hasPublishedByAdmin && hasRange && hasRejectedDeleted
          );
        };
        if (isPubliseringsBool()) {
          return null; // fjern for å sikre konsistent portefølje-agnostisk basis
        }
        keys.forEach((k) => {
          if (Array.isArray(b[k])) {
            const pruned = b[k]
              .map((c: any) => pruneClause(c))
              .filter((c: any) => !!c);
            if (pruned.length > 0) newBool[k] = pruned;
          }
        });
        // Behold minimum_should_match kun hvis should fortsatt finnes
        if (b.minimum_should_match && newBool.should) {
          newBool.minimum_should_match = b.minimum_should_match;
        }
        // Hvis bool ble tom -> fjern hele
        if (Object.keys(newBool).length === 0) return null;
        return { bool: newBool };
      }
      // Andre clause-typer (range, exists, simple_query_string etc.) beholdes
      return clause;
    };

    const pruneTopLevelArrays = (filtersObj: any): any => {
      if (!filtersObj || Object.keys(filtersObj).length === 0)
        return filtersObj;
      const cleaned: any = {};
      ['filter', 'must', 'should', 'must_not'].forEach((k) => {
        if (Array.isArray(filtersObj[k])) {
          const pruned = filtersObj[k]
            .map((c: any) => pruneClause(c))
            .filter((c: any) => !!c);
          if (pruned.length > 0) cleaned[k] = pruned;
        }
      });
      if (filtersObj.minimum_should_match && cleaned.should) {
        cleaned.minimum_should_match = filtersObj.minimum_should_match;
      }
      return cleaned;
    };

    const allFiltersWithoutPortfolio = opts?.includePortfolioInCounts
      ? allFilters // ta med portefølje-feltene i counts
      : pruneTopLevelArrays(allFilters); // gammel oppførsel

    // removeGeografiNested fjernet: område skal nå reflektere valgt område direkte

    // Fjern status-termer for status-aggregeringen slik at hver status viser total antall uavhengig av valg av andre statuser
    const removeStatusTerms = (filtersObj: any): any => {
      if (!filtersObj || Object.keys(filtersObj).length === 0)
        return filtersObj;
      const cleaned: any = {};
      // Hjelper: identifiser publiserings-kriterier (uten REJECTED/DELETED) slik de kan dukke opp fra statusQuery (STOPPED/UTLØPT)
      const erPubliseringsMustSet = (mustArray: any[]): boolean => {
        if (!Array.isArray(mustArray)) return false;
        // Krav: inneholder alle tre: administration.status DONE, exists publishedByAdmin, range published <= now/d
        let hasDone = false;
        let hasExists = false;
        let hasRange = false;
        for (const m of mustArray) {
          if (m?.term && m.term['stilling.administration.status'] === 'DONE')
            hasDone = true;
          else if (m?.exists?.field === 'stilling.publishedByAdmin')
            hasExists = true;
          else if (m?.range && m.range['stilling.published']) hasRange = true;
          else return false; // Inneholder annet -> ikke rent publiseringssett
        }
        return hasDone && hasExists && hasRange && mustArray.length === 3;
      };
      ['filter', 'must', 'should', 'must_not'].forEach((k) => {
        if (Array.isArray(filtersObj[k])) {
          const pruned = filtersObj[k]
            .map((c: any) => {
              if (c && c.term && c.term['stilling.status']) {
                return null; // fjern direkte status-term
              }
              if (c && c.terms && c.terms['stilling.status']) {
                return null; // fjern terms-variant
              }
              if (c && c.bool) {
                const inner = removeStatusTerms(c.bool);
                // Hvis det kun gjenstår et must-array med publiseringskriterier, fjern hele bool'en for å hindre inkonsistente status-tall
                if (
                  inner &&
                  Object.keys(inner).length === 1 &&
                  inner.must &&
                  erPubliseringsMustSet(inner.must)
                ) {
                  return null;
                }
                return Object.keys(inner).length === 0 ? null : { bool: inner };
              }
              return c;
            })
            .filter((c: any) => !!c);
          if (pruned.length > 0) cleaned[k] = pruned;
        }
      });
      if (filtersObj.minimum_should_match && cleaned.should) {
        cleaned.minimum_should_match = filtersObj.minimum_should_match;
      }
      return cleaned;
    };

    const allFiltersWithoutStatus = removeStatusTerms(
      allFiltersWithoutPortfolio,
    );

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

    // Hvis status er valgt legges dette til kun i geografi-aggregasjonen (område skal ta høyde for valgt status)
    // Status-valg legges i post_filter for treff, men aggregeringer ignorerer post_filter.
    // Vi gjenbruker post_filter-clausen dersom den filtrerer på stilling.status for å få korrekte område-tall.
    const statusPostFilterClause =
      this.postFilterClause &&
      typeof this.postFilterClause === 'object' &&
      JSON.stringify(this.postFilterClause).includes('"stilling.status"')
        ? this.postFilterClause
        : null;

    return {
      globalAggregering: {
        global: {},
        aggs: {
          // Visningsstatus-facet (Alle visningsstatuser fra VisningsStatus enum)
          visningsstatus: {
            // Beholder andre filtre (uten status) i container-filteret
            filter: {
              bool: {
                filter: [
                  ...(allFiltersWithoutStatus &&
                  Object.keys(allFiltersWithoutStatus).length > 0
                    ? [{ bool: allFiltersWithoutStatus }]
                    : []),
                ],
              },
            },
            aggs: {
              // Eksplicit definisjon av buckets som speiler visStillingsDataInfo logikken
              koder: {
                filters: {
                  filters: {
                    'Ikke publisert': {
                      bool: {
                        must: [{ term: { 'stilling.status': 'INACTIVE' } }],
                        must_not: [
                          { exists: { field: 'stilling.publishedByAdmin' } },
                          { term: { 'stilling.status': 'REJECTED' } },
                          { term: { 'stilling.status': 'DELETED' } },
                        ],
                      },
                    },
                    'Åpen for søkere': {
                      bool: {
                        must: [
                          { term: { 'stilling.status': 'ACTIVE' } },
                          {
                            term: { 'stilling.administration.status': 'DONE' },
                          },
                          { exists: { field: 'stilling.publishedByAdmin' } },
                          { range: { 'stilling.published': { lte: 'now/d' } } },
                        ],
                        must_not: [
                          { term: { 'stilling.status': 'REJECTED' } },
                          { term: { 'stilling.status': 'DELETED' } },
                        ],
                      },
                    },
                    'Stengt for søkere': {
                      bool: {
                        must: [
                          { term: { 'stilling.status': 'INACTIVE' } },
                          {
                            term: { 'stilling.administration.status': 'DONE' },
                          },
                          { exists: { field: 'stilling.publishedByAdmin' } },
                          { range: { 'stilling.published': { lte: 'now/d' } } },
                        ],
                        must_not: [
                          { range: { 'stilling.expires': { lt: 'now/d' } } },
                          { term: { 'stilling.status': 'REJECTED' } },
                          { term: { 'stilling.status': 'DELETED' } },
                        ],
                      },
                    },
                    'Utløpt - Stengt for søkere': {
                      bool: {
                        must: [
                          { term: { 'stilling.status': 'INACTIVE' } },
                          { range: { 'stilling.expires': { lt: 'now/d' } } },
                          {
                            term: { 'stilling.administration.status': 'DONE' },
                          },
                          { exists: { field: 'stilling.publishedByAdmin' } },
                          { range: { 'stilling.published': { lte: 'now/d' } } },
                        ],
                        must_not: [
                          { term: { 'stilling.status': 'REJECTED' } },
                          { term: { 'stilling.status': 'DELETED' } },
                        ],
                      },
                    },
                    Fullført: {
                      bool: {
                        must: [
                          { term: { 'stilling.status': 'STOPPED' } },
                          {
                            term: { 'stilling.administration.status': 'DONE' },
                          },
                          { exists: { field: 'stilling.publishedByAdmin' } },
                          { range: { 'stilling.published': { lte: 'now/d' } } },
                        ],
                        must_not: [
                          { term: { 'stilling.status': 'REJECTED' } },
                          { term: { 'stilling.status': 'DELETED' } },
                        ],
                      },
                    },
                    Avbrutt: {
                      bool: {
                        must: [{ term: { 'stilling.status': 'DELETED' } }],
                      },
                    },
                  },
                },
              },
            },
          },
          // Kategori-facet (Stilling / Jobbmesse)
          kategori: {
            filters: {
              filters: {
                stilling: {
                  bool: {
                    filter: [
                      ...(allFiltersWithoutPortfolio &&
                      Object.keys(allFiltersWithoutPortfolio).length > 0
                        ? [{ bool: allFiltersWithoutPortfolio }]
                        : []),
                      {
                        bool: {
                          must_not: [
                            {
                              term: {
                                'stillingsinfo.stillingskategori': 'JOBBMESSE',
                              },
                            },
                            {
                              term: {
                                'stillingsinfo.stillingskategori':
                                  'ARBEIDSTRENING',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                jobbmesse: {
                  bool: {
                    filter: [
                      ...(allFiltersWithoutPortfolio &&
                      Object.keys(allFiltersWithoutPortfolio).length > 0
                        ? [{ bool: allFiltersWithoutPortfolio }]
                        : []),
                      {
                        term: {
                          'stillingsinfo.stillingskategori': 'JOBBMESSE',
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          // Rå buckets for alle stillingskategorier (inkl. FORMIDLING, ARBEIDSTRENING, JOBBMESSE, osv.) – respekterer valgte filtre
          stillingskategori: {
            filter: {
              bool: {
                filter: [
                  ...(allFiltersWithoutPortfolio &&
                  Object.keys(allFiltersWithoutPortfolio).length > 0
                    ? [{ bool: allFiltersWithoutPortfolio }]
                    : []),
                ],
              },
            },
            aggs: {
              koder: {
                terms: {
                  field: 'stillingsinfo.stillingskategori',
                  size: 20,
                  order: { _key: 'asc' },
                },
              },
            },
          },
          // Geografi-facets (fylker og kommuner) – teller per område gitt andre filtre (IGNORERER valgt område)
          geografi: {
            filter: {
              bool: {
                filter: [
                  // Endret: område skal nå reflektere valgt område også, så vi bruker fullstendig filter-sett
                  ...(allFiltersWithoutPortfolio &&
                  Object.keys(allFiltersWithoutPortfolio).length > 0
                    ? [{ bool: allFiltersWithoutPortfolio }]
                    : []),
                  // Inkluder valgt status hvis satt (status legges ellers kun i post_filter)
                  ...(statusPostFilterClause ? [statusPostFilterClause] : []),
                ],
              },
            },
            aggs: {
              nested_geografi: {
                nested: { path: 'stilling.locations' },
                aggs: {
                  fylker: {
                    terms: {
                      field: 'stilling.locations.countyCode', // bruker kode for å samsvare med filtrering
                      size: 50, // redusert ytterligere - Norge har kun 11 fylker
                      order: { _key: 'asc' },
                    },
                    aggs: {
                      // Unik telling av stillinger (parent docs) som har minst én location i dette fylket
                      stillinger: {
                        reverse_nested: {},
                        aggs: {
                          unique_count: {
                            cardinality: {
                              field: 'stilling.uuid',
                            },
                          },
                        },
                      },
                    },
                  },
                  kommuner: {
                    terms: {
                      field: 'stilling.locations.municipalCode',
                      size: 200, // redusert ytterligere for å unngå bucket-grense
                      order: { _key: 'asc' },
                    },
                  },
                  // Ekstra agg: dokumenter uten fylkeskode (countyCode mangler eller tom streng) grupperes på county.keyword
                  // slik at vi kan legge disse til korrekt fylke-count (eks: AGDER uten kode skal inn under 42)
                  utenCountyCode: {
                    filter: {
                      bool: {
                        should: [
                          {
                            bool: {
                              must_not: [
                                {
                                  exists: {
                                    field: 'stilling.locations.countyCode',
                                  },
                                },
                              ],
                            },
                          },
                          { term: { 'stilling.locations.countyCode': '' } },
                        ],
                        minimum_should_match: 1,
                      },
                    },
                    aggs: {
                      fylker: {
                        terms: {
                          field: 'stilling.locations.county.keyword',
                          size: 20, // redusert ytterligere - kun noen få fylker mangler kode
                          order: { _key: 'asc' },
                        },
                        aggs: {
                          // Parent-docs for missing countyCode (brukes for å unngå dobbelttelling hvis samme stilling også har kode)
                          stillinger: {
                            reverse_nested: {},
                            aggs: {
                              unique_count: {
                                cardinality: {
                                  field: 'stilling.uuid',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  /**
   * Setter standard aggregering som alltid skal være med
   * Inkluderer fritekst-søk hvis det finnes
   */
  setStandardAggregation(
    navIdent?: string,
    kontorEnhetId?: string,
    fritekst?: string[],
    opts?: {
      formidlinger?: boolean;
      utenOppdrag?: boolean;
      includePortfolioInCounts?: boolean;
    },
  ): this {
    const fritekstSøkestreng =
      fritekst && fritekst.length > 0 ? fritekst.join(' ') : undefined;

    const standardAggs = this.buildStandardAggregation(
      navIdent,
      kontorEnhetId,
      fritekstSøkestreng,
      opts,
    );

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
    }
    // Legg til aggregering hvis spesifisert
    if (Object.keys(this.aggregations).length > 0) {
      query.aggs = this.aggregations;
    }

    if (this.postFilterClause) {
      query.post_filter = this.postFilterClause;
    }

    return query;
  }
}
