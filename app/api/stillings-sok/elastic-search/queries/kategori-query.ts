import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';

export const kategoriQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const kategori = params.filter.kategori;

  // Hvis kun jobbmesse er valgt
  if (kategori.includes(Stillingskategori.Jobbmesse)) {
    esBuilder.addBoolFilter({
      should: [
        {
          term: {
            'stillingsinfo.stillingskategori': 'JOBBMESSE',
          },
        },
      ],
      minimum_should_match: 1,
    });
  }

  // Hvis kun stilling er valgt (ikke jobbmesse)
  if (
    kategori.includes(Stillingskategori.Stilling) &&
    !kategori.includes(Stillingskategori.Jobbmesse)
  ) {
    esBuilder.addBoolFilter({
      must_not: [
        {
          term: {
            'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
          },
        },
        {
          term: {
            'stillingsinfo.stillingskategori': 'JOBBMESSE',
          },
        },
      ],
    });
  }
};
