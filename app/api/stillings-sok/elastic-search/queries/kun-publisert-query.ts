import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';

export const kunPubliserte = (esBuilder: ElasticSearchQueryBuilder) => {
  esBuilder.addBoolFilter({
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
  });
};
