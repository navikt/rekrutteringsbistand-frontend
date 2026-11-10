import type { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import type { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { StillingsSøkOmfang } from '@/app/stilling/_util/stillingssøk-typer';

export const omfangFelt = 'stilling.properties.extent';

// Verdier i indeksen (keyword, case-sensitiv), jf. Extent i pam-ad
const HELTID = 'Heltid';
const DELTID = 'Deltid';

/**
 * En stilling kan ha både Heltid og Deltid, og treffer da begge valgene.
 * Flere valg kombineres med «eller».
 */
export const omfangClause = (omfang: StillingsSøkOmfang) => {
  switch (omfang) {
    case StillingsSøkOmfang.Heltid:
      return { term: { [omfangFelt]: HELTID } };
    case StillingsSøkOmfang.Deltid:
      return { term: { [omfangFelt]: DELTID } };
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
