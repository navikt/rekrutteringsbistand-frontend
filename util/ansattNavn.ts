// Bruk navnedelene fra Modia-dekoratøren, ikke JWT eller valgt kollega.
// Samme navneformat som ved innsending av lagtTilAvNavn: fornavn etternavn.
export const formaterAnsattNavn = (bruker?: {
  fornavn?: string | null;
  etternavn?: string | null;
}): string | undefined =>
  [bruker?.fornavn?.trim(), bruker?.etternavn?.trim()]
    .filter(Boolean)
    .join(' ') || undefined;
