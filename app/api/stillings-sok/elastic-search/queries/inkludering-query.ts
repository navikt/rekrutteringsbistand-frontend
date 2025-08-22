import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

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
