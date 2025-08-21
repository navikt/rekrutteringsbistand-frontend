import { StillingsSøkPortefølje } from '../../../stilling/stillingssøk-typer';
import {
  GeografiType,
  PamGeografi,
} from '../../pam-geografi/typehead/lokasjoner/usePamGeografi';
import { ElasticsearchFilters } from './ElasticsearchFilters';

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
  utenOppdrag: boolean;
};

interface ElasticSearchQueryBuilderParams {
  filter: StillingsSøkFilter;
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
 */
export class ElasticSearchQueryBuilder {
  private filterClauses: any[] = [];
  private mustClauses: any[] = [];
  private shouldClauses: any[] = [];
  private mustNotClauses: any[] = [];
  private sorting: any[] = [];
  private aggregations: any = {};

  /**
   * Legger til filter-clause (MÅ matche, påvirker ikke score)
   */
  addFilter(clause: any): this {
    if (Array.isArray(clause)) {
      this.filterClauses.push(...clause);
    } else if (clause) {
      this.filterClauses.push(clause);
    }
    return this;
  }

  /**
   * Legger til must-clause (MÅ matche og påvirker score)
   */
  addMust(clause: any): this {
    if (Array.isArray(clause)) {
      this.mustClauses.push(...clause);
    } else if (clause) {
      this.mustClauses.push(clause);
    }
    return this;
  }

  /**
   * Legger til should-clause (BØR matche)
   */
  addShould(clause: any): this {
    if (Array.isArray(clause)) {
      this.shouldClauses.push(...clause);
    } else if (clause) {
      this.shouldClauses.push(clause);
    }
    return this;
  }

  /**
   * Legger til must_not-clause (MÅ IKKE matche)
   */
  addMustNot(clause: any): this {
    if (Array.isArray(clause)) {
      this.mustNotClauses.push(...clause);
    } else if (clause) {
      this.mustNotClauses.push(clause);
    }
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

  // ==========================================
  // QUERY BUILDING METHODS
  // ==========================================

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
      // Hvis vi har should-clauses, krever vi at minst én matcher
      if (this.mustClauses.length === 0 && this.filterClauses.length === 0) {
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
      query.sort = this.sorting;
    }

    // Legg til aggregering hvis spesifisert
    if (Object.keys(this.aggregations).length > 0) {
      query.aggs = this.aggregations;
    }

    return query;
  }

  /**
   * Statisk metode for å bygge en standard stillingssøk-query
   * KOMPLETT INTERNALISERT - bruker ingen esFiltre-imports
   */
  static buildStillingsSøkQuery({
    filter,
    eierNavKontorEnhetId,
    navIdent,
    geografiData,
    formidlinger = false,
    finnStillingerForKandidat = false,
  }: ElasticSearchQueryBuilderParams): any {
    const builder = new ElasticSearchQueryBuilder();

    // Grunnleggende filter (skjul slettede og rejected stillinger)
    if (!formidlinger && !finnStillingerForKandidat) {
      builder.addFilter(ElasticsearchFilters.getBasicVariables());

      const ownerFilter = ElasticsearchFilters.getOwnerFilter(navIdent);
      if (ownerFilter) {
        builder.addFilter(ownerFilter);
      }
    }

    // Legg til sortering
    if (filter.sortering) {
      const sorting = ElasticsearchFilters.getSorting(filter.sortering);
      builder.setSorting(sorting);
    }

    // Status-filter
    if (filter.statuser && filter.statuser.length > 0) {
      const statusFilters = ElasticsearchFilters.getStatusFilters(
        filter.statuser,
        navIdent,
      );
      builder.addFilter(statusFilters);
    }

    // Fylke/kommune-filter
    if (filter.fylker?.length > 0 || filter.kommuner?.length > 0) {
      const geografiFilter = ElasticsearchFilters.getGeographicFilters(
        [
          ...filter.fylker.map((fylke) => ({
            navn: fylke,
            type: GeografiType.FYLKE,
            lokasjon: { fylkesnummer: fylke },
          })),
          ...filter.kommuner.map((kommune) => ({
            navn: kommune,
            type: GeografiType.KOMMUNE,
            lokasjon: { kommunenummer: kommune },
          })),
        ],
        geografiData,
      );
      if (geografiFilter) {
        builder.addFilter(geografiFilter);
      }
    }

    // Kategori-filter
    if (filter.kategori && filter.kategori.length > 0) {
      const categoryFilters = ElasticsearchFilters.getCategoryFilters(
        filter.kategori,
      );
      builder.addFilter(categoryFilters);
    } else if (formidlinger) {
      const formidlingFilters =
        ElasticsearchFilters.getFormidlingCategoryFilters();
      builder.addFilter(formidlingFilters);
    }

    // Inkludering-filter
    if (filter.inkludering && filter.inkludering.length > 0) {
      const inkluderingFilters = ElasticsearchFilters.getInclusionFilters({
        inkludering: filter.inkludering,
        inkluderingUnderkategori: filter.inkluderingUnderkategori || [],
      });
      builder.addFilter(inkluderingFilters);
    }

    // Synlighet-filter
    const visibilityFilters = ElasticsearchFilters.getVisibilityFilters(
      filter.portefølje as StillingsSøkPortefølje,
    );
    builder.addFilter(visibilityFilters);

    // Fritekst-søk (legges til should-clause for scoring)
    if (filter.fritekst && filter.fritekst.length > 0) {
      const fritekstFilters = ElasticsearchFilters.getFullTextSearch(
        filter.fritekst,
      );
      builder.addShould(fritekstFilters);
    }

    // Bygg query
    const from = regnUtFørsteTreffFra(filter.side, maksAntallTreffPerSøk);
    return builder.build(maksAntallTreffPerSøk, from);
  }
}

/**
 * Legacy function for backward compatibility
 */
export function stillingssøkElasticSearchQuery(
  params: ElasticSearchQueryBuilderParams,
): any {
  return ElasticSearchQueryBuilder.buildStillingsSøkQuery(params);
}
