// Samme regel som Fødselsnummersjekk i rekrutteringsbistand-bruker-api. Endres den ene, må den andre følge med.
// Mellomrom er det eneste skilletegnet mellom to sifre. Det står eksplisitt, fordi \s matcher ulike tegn i Kotlin og JS.
// NFKC gjør hardt mellomrom om til vanlig mellomrom og sifre i full bredde om til vanlige sifre.
// Ingen g-flagg, så test() ikke husker lastIndex mellom kall.
const elleveSifre = /(?<!\d)\d(?: ?\d){10}(?!\d)/;
// Flere mellomrom på rad regnes som ett, så `123456  78901` også stoppes.
const flereMellomrom = / +/g;

/**
 * Sant hvis teksten inneholder 11 sifre, som kan være et fødselsnummer, D-nummer eller H-nummer.
 * Et sikkerhetsnett mot at noen lagrer et fødselsnummer ved et uhell, ikke mot bevisst omgåelse.
 */
export const inneholderFødselsnummer = (tekst: string) =>
  elleveSifre.test(tekst.normalize('NFKC').replace(flereMellomrom, ' '));

export interface FrieFilterverdier {
  felt: string;
  verdier: string[];
}

export const verdierLignerFødselsnummer = (verdier: readonly string[]) =>
  [...verdier, verdier.join(' ')].some(inneholderFødselsnummer);

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
