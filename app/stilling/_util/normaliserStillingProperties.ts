//TODO Kan bytte ut opprett stilling sin logikk men sentralisert serialisering?
export const coerceArrayOrValueToString = (
  value: unknown,
): string | undefined => {
  if (value === null || value === undefined) return undefined;
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const SPESIFIKKE_ARRAYNØKLER = new Set([
  'workhours',
  'workday',
  'tags',
  'searchtags',
]);

export const normaliserPropertiesTilStrenger = (
  props: Record<string, unknown> | null | undefined,
) => {
  if (!props) return props as undefined;
  const next: Record<string, string> = {};
  Object.entries(props).forEach(([key, value]) => {
    const coerced = coerceArrayOrValueToString(value);
    if (coerced !== undefined) next[key] = coerced;
  });
  // (valgfritt) sørg for at kjente “array-nøkler” faktisk er JSON-array-strenger
  SPESIFIKKE_ARRAYNØKLER.forEach((k) => {
    if (next[k] && !next[k].trim().startsWith('[')) {
      // pakk enkel verdi inn i array
      next[k] = JSON.stringify([next[k]]);
    }
  });
  return next;
};
