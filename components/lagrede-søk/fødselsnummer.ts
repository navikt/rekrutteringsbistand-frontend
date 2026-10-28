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
