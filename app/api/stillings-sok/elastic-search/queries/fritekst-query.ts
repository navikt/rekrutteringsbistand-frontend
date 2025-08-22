import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

export const fritekstQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const fritekst = params.filter.fritekst;

  const inneholderVerdierMedBareTall: boolean = fritekst.some((verdi) =>
    /^R?\d+$/.test(verdi),
  );

  const ordSomSkalFiltreresUt = [
    'innen',
    'på',
    'av',
    'og',
    'for',
    'med',
    'som',
    'mv.',
    'o.l.',
  ];

  const fritekstSøkestreng = fritekst
    .map((fritekstStreng) => {
      const ord = fritekstStreng
        .split(' ')
        .filter(
          (it) =>
            it.length > 1 && !ordSomSkalFiltreresUt.includes(it.toLowerCase()),
        );

      return `(+${ord.map((ord) => ord.trim()).join(' +')})`;
    })
    .join(' | ');

  let felt: string | undefined;

  if (!inneholderVerdierMedBareTall) {
    felt = 'tekstfelter';
  }

  // Bruk den prosesserte fritekstSøkestreng med addFritekstSøk
  if (fritekstSøkestreng && fritekstSøkestreng.length > 0) {
    esBuilder
      .addFritekstSøk(fritekstSøkestreng, felt)
      .setMinimumShouldMatch(fritekst.length ? '1' : '0');
  }
};
