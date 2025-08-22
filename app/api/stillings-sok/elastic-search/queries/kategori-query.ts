import { Stillingskategori } from '../../../../stilling/stilling-typer';
import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

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
