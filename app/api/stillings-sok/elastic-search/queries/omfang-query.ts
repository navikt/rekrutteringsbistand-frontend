import type { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import type { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { StillingsSøkOmfang } from '@/app/stilling/_util/stillingssøk-typer';

export const omfangFelt = 'stilling.properties.extent';

// Verdier i indeksen (keyword, case-sensitiv), jf. Extent i pam-ad
const HELTID = 'Heltid';
const DELTID = 'Deltid';
const HELTID_OG_DELTID = 'Heltid_og_Deltid';

/**
 * Samme inndeling som arbeidsplassen.no: «Heltid og deltid» teller med under både heltid og deltid.
 * «Ikke oppgitt» er alt annet (Ukjent, tom eller manglende verdi).
 */
export const omfangClause = (omfang: StillingsSøkOmfang) => {
  switch (omfang) {
    case StillingsSøkOmfang.Heltid:
      return { terms: { [omfangFelt]: [HELTID, HELTID_OG_DELTID] } };
    case StillingsSøkOmfang.Deltid:
      return { terms: { [omfangFelt]: [DELTID, HELTID_OG_DELTID] } };
    case StillingsSøkOmfang.IkkeOppgitt:
      return {
        bool: {
          must_not: [
            { terms: { [omfangFelt]: [HELTID, DELTID, HELTID_OG_DELTID] } },
          ],
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
