import type { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import type { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';

export const ansettelsesformFelt = 'stilling.properties.engagementtype';

export const ansettelsesformQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const valgte = params.filter.ansettelsesform ?? [];

  if (valgte.length === 0) return;

  esBuilder.addFasettFilter('ansettelsesform', {
    terms: { [ansettelsesformFelt]: valgte },
  });
};
