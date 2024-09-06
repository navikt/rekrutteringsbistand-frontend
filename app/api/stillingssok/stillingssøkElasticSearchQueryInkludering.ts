export type StillingsSøkFilter = {
  inkludering: string[];
  inkluderingUnderkategori: string[];
};

export function generateElasticSearchQueryInkludering(
  filter: StillingsSøkFilter,
) {
  return [
    {
      terms: {
        'stilling.properties.tags': filter.inkludering,
      },
    },
  ];
}
