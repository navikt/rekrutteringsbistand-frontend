/*
 * Hjelpere for `byggLagretSøkFilter` i hvert domene. Verdiene sorteres og dupliseres ikke, så samme valg gir samme
 * filter uansett rekkefølgen de ble valgt i. Verdier bruker-api ikke tar imot, tas ikke med.
 */

export const sortertUtenDuplikater = <T extends string>(
  verdier: readonly T[],
): T[] => [...new Set(verdier)].sort();

/** Bare verdier som finnes i `gyldige`. */
export const bareGyldige = <T extends string>(
  verdier: readonly string[],
  gyldige: readonly T[],
): T[] =>
  sortertUtenDuplikater(
    verdier.filter((verdi): verdi is T => gyldige.includes(verdi as T)),
  );

/** Bare verdier med nøyaktig `antall` sifre, som fylkes-, kommune- og kontornumre. */
export const bareSifre = (verdier: readonly string[], antall: number) => {
  const mønster = new RegExp(`^\\d{${antall}}$`);
  return sortertUtenDuplikater(verdier.filter((verdi) => mønster.test(verdi)));
};

/** Query-strengen fra nuqs med sorterte nøkler, slik den lagres og sammenlignes. */
export const sortertFilter = (serialisert: string) => {
  const filter = new URLSearchParams(serialisert);
  filter.sort();
  return filter.toString();
};
