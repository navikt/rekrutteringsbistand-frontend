export type StillingsSøkFilter = {
  inkludering: string[];
  inkluderingUnderkategori: string[];
};

export function esInkludering(filter: StillingsSøkFilter) {
  return [
    {
      terms: {
        'stilling.properties.tags': filter.inkludering,
      },
    },
  ];
}
