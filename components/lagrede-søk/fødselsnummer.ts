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

export interface FrieFilterverdier {
  felt: string;
  verdier: string[];
}

export const verdierLignerFødselsnummer = (verdier: readonly string[]) =>
  [...verdier, verdier.join(' ')].some(
    (tekst) =>
      inneholderFødselsnummer(tekst) ||
      inneholderFødselsnummer(tekst.replaceAll(',', ' ')),
  );

/**
 * Fjerner verdier som ligner et fødselsnummer. Ligner de gjenværende verdiene et fødselsnummer til sammen, for
 * eksempel et nummer delt over to verdier, fjernes alle.
 */
export const utenFødselsnummer = (verdier: readonly string[]): string[] => {
  const gjenværende = verdier.filter(
    (verdi) => !verdierLignerFødselsnummer([verdi]),
  );
  return verdierLignerFødselsnummer(gjenværende) ? [] : gjenværende;
};
