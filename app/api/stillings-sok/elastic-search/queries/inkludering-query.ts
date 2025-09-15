import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';

export const inkluderingQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  if (params.filter.inkludering && params.filter.inkludering.length > 0) {
    esBuilder.addFilter({
      terms: {
        'stilling.properties.tags': params.filter.inkludering,
      },
    });
  }
};
