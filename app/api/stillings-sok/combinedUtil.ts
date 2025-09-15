// Deprecated: tidligere kombinert søk utils. Beholdt som tom modul for å unngå breaking imports under opprydding.
// All funksjonalitet er flyttet til server-route (`route.ts`) og klient-filen `byggKombinertQuery.ts`.
// Denne filen er med vilje uten 'use client' og uten server-avhengigheter (oboProxy/oasis) for å hindre bundling av prom-client.

export interface ESCombinedBody {
  treff: any;
  aggs: any;
}

export function executeCombinedSearch() {
  throw new Error(
    'combinedUtil er avviklet – bruk hoved /stilling endepunktet.',
  );
}

export function byggRespons() {
  throw new Error('byggRespons flyttet til route.ts');
}
