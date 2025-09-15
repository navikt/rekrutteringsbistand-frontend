// Hjelpefunksjoner for å bygge opp query-stringen som representerer et standardsøk.
// Skal filtrere bort parametere som ikke skal persisteres.

export const EKSCLUDERTE_STANDARDSOK_PARAMETERE = new Set<string>([
  'utenOppdrag',
  'visStillingId',
  'finnKandidater',
]);

export interface StandardsokResultat {
  query: string; // Filtrert query-string som kan lagres som standardsøk
  harKunPortefolje: boolean; // Om eneste parameter er 'portefolje'
}

/**
 * Bygger query-string for standardsøk ved å ekskludere visse parametere.
 * Returnerer også flagg for om søket kun består av portefølje-filteret.
 */
export function byggStandardsokQuery(
  // Typen i Next.js er ReadonlyURLSearchParams, men vi unngår å importere den direkte.
  // Vi aksepterer derfor 'any' her og benytter kun metoder som finnes på URLSearchParams.
  searchParams: any,
): StandardsokResultat {
  const filteredParams = new URLSearchParams();
  searchParams.forEach((value: string, key: string) => {
    if (!EKSCLUDERTE_STANDARDSOK_PARAMETERE.has(key)) {
      filteredParams.append(key, value);
    }
  });

  const query = filteredParams.toString();
  const urlParams = new URLSearchParams(query);
  const harKunPortefolje = urlParams.size === 1 && urlParams.has('portefolje');

  return { query, harKunPortefolje };
}
