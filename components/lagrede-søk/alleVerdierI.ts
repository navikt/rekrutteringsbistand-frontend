/**
 * Gir listen tilbake uendret, men gir typefeil hvis den mangler en verdi i `T` eller har en verdi utenfor `T`.
 * Brukes når verdiene som lagres, må skrives ut for seg, men skal følge en enum eller union i søket.
 */
export const alleVerdierI =
  <T extends string>() =>
  <const L extends readonly T[]>(
    liste: L &
      ([Exclude<T, L[number]>] extends [never]
        ? unknown
        : { mangler: Exclude<T, L[number]> }),
  ): L =>
    liste;
