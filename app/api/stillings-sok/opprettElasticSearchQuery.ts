import {
  ElasticSearchQueryBuilder,
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from './elastic-search/elasticSearchQueryBuilder';
import { fritekstQuery } from './elastic-search/queries/fritekst-query';
import { geografiQuery } from './elastic-search/queries/geografi-query';
import { inkluderingQuery } from './elastic-search/queries/inkludering-query';
import { kategoriQuery } from './elastic-search/queries/kategori-query';
import { esPortefølje } from './elastic-search/queries/portefølje-query';
import { sorteringQuery } from './elastic-search/queries/sortering-query';
import { statusQuery } from './elastic-search/queries/status-query';
import { PamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { IStillingsSøkContext } from '@/app/stilling/StillingsSøkContext';

export interface GenerateElasticSearchQueryParams {
  filter: IStillingsSøkContext;
  eierNavKontorEnhetId?: string;
  navIdent?: string;
  geografiData?: PamGeografi[];
  formidlinger?: boolean;
  finnStillingerForKandidat?: boolean;
}

/**
 * Ny funksjon: bygger kun søk etter treff (uten aggregeringer)
 */
export function opprettElasticSearchTreffQuery(
  params: GenerateElasticSearchQueryParams,
) {
  const esBuilder = new ElasticSearchQueryBuilder();

  // Gjenbruker samme filterlogikk som tidligere
  esPortefølje(params, esBuilder);
  fritekstQuery(params, esBuilder);
  statusQuery(params, esBuilder);
  kategoriQuery(params, esBuilder);
  geografiQuery(params, esBuilder);
  sorteringQuery(params, esBuilder);

  if (
    params.filter.inkludering.length > 0 ||
    params.filter.inkluderingUnderkategori.length > 0
  ) {
    esBuilder.addFilter(inkluderingQuery(params, esBuilder));
  }

  const from = regnUtFørsteTreffFra(params.filter.side, maksAntallTreffPerSøk);
  return esBuilder.build(maksAntallTreffPerSøk, from);
}

/**
 * Ny funksjon: bygger kun aggregeringsspørring (size=0) for å hente antall.
 */
export function opprettElasticSearchAggregeringsQuery(
  params: GenerateElasticSearchQueryParams,
) {
  const esBuilder = new ElasticSearchQueryBuilder();

  esPortefølje(params, esBuilder);
  fritekstQuery(params, esBuilder);
  statusQuery(params, esBuilder);
  kategoriQuery(params, esBuilder);
  geografiQuery(params, esBuilder);
  // sortering er irrelevant for aggregering – utelates bevisst

  if (
    params.filter.inkludering.length > 0 ||
    params.filter.inkluderingUnderkategori.length > 0
  ) {
    esBuilder.addFilter(inkluderingQuery(params, esBuilder));
  }

  esBuilder.setStandardAggregation(
    params.navIdent,
    params.eierNavKontorEnhetId,
    params.filter.fritekst,
    {
      formidlinger: params.formidlinger,
      utenOppdrag: params.filter.utenOppdrag,
      includePortfolioInCounts: true,
    },
  );

  // size=0 for kun aggregeringer
  return esBuilder.build(0, 0);
}
