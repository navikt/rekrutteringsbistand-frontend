// Samme regel som Fødselsnummersjekk i rekrutteringsbistand-bruker-api. Endres den ene, må den andre følge med.
// Ett skilletegn er lov mellom to sifre. Skilletegnene står eksplisitt, fordi \s matcher ulike tegn i Kotlin og JS.
// Ingen g-flagg, så test() ikke husker lastIndex mellom kall.
const elleveSifre = /(?<!\d)\d(?:[ \t\u00A0\u202F.\-/]?\d){10}(?!\d)/;

/**
 * Sant hvis teksten inneholder 11 sifre, som kan være et fødselsnummer, D-nummer eller H-nummer.
 * Et sikkerhetsnett mot at noen lagrer et fødselsnummer ved et uhell, ikke mot bevisst omgåelse.
 */
export const inneholderFødselsnummer = (tekst: string) =>
  elleveSifre.test(tekst.normalize('NFKC'));

/** Filterverdier veilederen har skrevet selv, med navnet på feltet slik det står i filterpanelet. */
export interface FrieFilterverdier {
  felt: string;
  verdier: string[];
}

/**
 * Samme regel som `frieVerdier` i bruker-api: én verdi eller alle verdiene satt sammen ligner et fødselsnummer.
 * Komma regnes som skilletegn, fordi en verdi kan ha komma i seg.
 */
export const verdierLignerFødselsnummer = (verdier: readonly string[]) =>
  [...verdier, verdier.join(' ')].some(
    (tekst) =>
      inneholderFødselsnummer(tekst) ||
      inneholderFødselsnummer(tekst.replaceAll(',', ' ')),
  );
