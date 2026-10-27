/*
 * Felles regler for filterstrengen i lagrede søk. Backend sammenligner strengene, så like filtre må gi lik streng:
 * tomme lister og standardverdier utelates, lister slås sammen med komma, og nøklene sorteres.
 * Hvert domene bestemmer selv hvilke parametere som finnes, og hvilke standardverdier de har.
 */

export const erEnAv = <T extends string>(
  gyldige: readonly T[],
  verdi: string,
): verdi is T => (gyldige as readonly string[]).includes(verdi);

export const lagFilterstreng = (
  bygg: (filter: {
    settVerdi: (navn: string, verdi: string) => void;
    settListe: (navn: string, verdier: string[]) => void;
  }) => void,
): string => {
  const filter = new URLSearchParams();
  bygg({
    settVerdi: (navn, verdi) => filter.set(navn, verdi),
    settListe: (navn, verdier) => {
      if (verdier.length > 0) filter.set(navn, verdier.join(','));
    },
  });
  filter.sort();
  return filter.toString();
};

// null betyr at parameteren mangler og skal få standardverdien. En tom liste er et lagret valg.
export const tolkFilterstreng = (filterstreng: string) => {
  const filter = new URLSearchParams(filterstreng);
  return {
    liste: (navn: string): string[] | null => {
      const verdi = filter.get(navn);
      if (verdi === null) return null;
      return verdi === '' ? [] : verdi.split(',');
    },
    enkeltverdi: <T extends string>(
      navn: string,
      gyldige: readonly T[],
    ): T | null => {
      const verdi = filter.get(navn);
      return verdi !== null && erEnAv(gyldige, verdi) ? verdi : null;
    },
  };
};
