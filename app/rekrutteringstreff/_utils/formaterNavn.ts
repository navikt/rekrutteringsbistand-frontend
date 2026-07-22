export const formaterNavn = (
  etternavn: string | null | undefined,
  fornavn: string | null | undefined,
  fallback = '',
): string => {
  if (etternavn && fornavn) return `${etternavn}, ${fornavn}`;
  return etternavn || fornavn || fallback;
};
