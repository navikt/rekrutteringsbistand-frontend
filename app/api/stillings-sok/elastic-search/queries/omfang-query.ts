import type { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import type { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { StillingsSøkOmfang } from '@/app/stilling/_util/stillingssøk-typer';

export const omfangFelt = 'stilling.properties.extent';
const stillingsprosentFelt = 'stilling.properties.jobpercentage';
const prosentintervallFelt = 'stilling.properties.jobpercentagerange';

// Verdier i indeksen (keyword, case-sensitiv), jf. Extent i pam-ad
const HELTID = 'Heltid';
const DELTID = 'Deltid';

/**
 * En stilling kan ha både Heltid og Deltid, og treffer da begge valgene.
 * Deltid omfatter også stillinger med prosent ulik 100 eller et prosentintervall.
 * Flere valg kombineres med «eller».
 */
export const omfangClause = (omfang: StillingsSøkOmfang) => {
  switch (omfang) {
    case StillingsSøkOmfang.Heltid:
      return { term: { [omfangFelt]: HELTID } };
    case StillingsSøkOmfang.Deltid:
      return {
        bool: {
          should: [
            { term: { [omfangFelt]: DELTID } },
            {
              bool: {
                filter: [{ exists: { field: stillingsprosentFelt } }],
                must_not: [{ terms: { [stillingsprosentFelt]: ['100', ''] } }],
              },
            },
            {
              bool: {
                filter: [{ exists: { field: prosentintervallFelt } }],
                must_not: [{ term: { [prosentintervallFelt]: '' } }],
              },
            },
          ],
          minimum_should_match: 1,
        },
      };
  }
};

export const omfangQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const gyldigeVerdier = Object.values(StillingsSøkOmfang) as string[];
  const valgte = (params.filter.omfang ?? []).filter((o) =>
    gyldigeVerdier.includes(o),
  ) as StillingsSøkOmfang[];

  if (valgte.length === 0) return;

  esBuilder.addFasettFilter('omfang', {
    bool: {
      should: valgte.map(omfangClause),
      minimum_should_match: 1,
    },
  });
};
