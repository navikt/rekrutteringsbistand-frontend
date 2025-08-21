import { PamGeografi } from '../pam-geografi/typehead/lokasjoner/usePamGeografi';
import {
  ElasticSearchQueryBuilder,
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
  StillingsSøkFilter,
} from './elastic-search/ElasticSearchQueryBuilder';

// Re-export for backward compatibility
export { maksAntallTreffPerSøk, regnUtFørsteTreffFra, type StillingsSøkFilter };

interface GenerateElasticSearchQueryParams {
  filter: StillingsSøkFilter;
  eierNavKontorEnhetId?: string;
  navIdent?: string;
  geografiData?: PamGeografi[];
  formidlinger?: boolean;
  finnStillingerForKandidat?: boolean;
}

export function generateElasticSearchQuery(
  params: GenerateElasticSearchQueryParams,
) {
  return ElasticSearchQueryBuilder.buildStillingsSøkQuery(params);
}
