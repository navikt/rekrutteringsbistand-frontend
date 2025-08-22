import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

export const sorteringQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const sortering = params.filter.sortering;

  const sorteringsalternativer: { [key: string]: any[] } = {
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
    relevans: [], // Default Elasticsearch scoring - ingen eksplisitt sortering
  };

  // Hvis ingen sortering er spesifisert, bruk 'publisert' som default
  const sorteringsNøkkel = sortering || 'publisert';
  const valgtSortering =
    sorteringsalternativer[sorteringsNøkkel] ||
    sorteringsalternativer.publisert;

  if (valgtSortering && valgtSortering.length > 0) {
    esBuilder.setSorting(valgtSortering);
  }
};
