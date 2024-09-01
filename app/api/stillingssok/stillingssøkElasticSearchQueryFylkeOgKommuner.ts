export type StillingsSøkFilter = {
  fylker: string[];
  kommuner: string[];
};

export function generateElasticSearchQueryFylkerOgKommuner(
  filter: StillingsSøkFilter,
) {
  const fylkeOgKommuneQuery: any[] = [];

  return fylkeOgKommuneQuery ?? null;
}
