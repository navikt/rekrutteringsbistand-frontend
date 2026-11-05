import type { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { inneholderFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';

/**
 * Søkeord står ikke i URL-en. For at søket skal være uendret når veilederen åpner et kort og går tilbake,
 * husker vi søkeordene per filter i minnet. Kortene i søkene bruker klientnavigering, så minnet står seg.
 * Søkeordene er borte etter refresh, og de skrives aldri til nettleserlagring. Søkeord som kan være et
 * fødselsnummer, huskes ikke, som når et søk lagres.
 */
const MAKS_ANTALL_FILTRE = 20;

type SøkeordPerFilter = Record<string, string[]>;

const iMinnet = new Map<LagredeSøkDomene, SøkeordPerFilter>();

// Tidligere versjoner husket søkeordene i sessionStorage. Kan fjernes når de ikke lenger kan ligge i en åpen fane.
const fjernGamleNøkler = () => {
  try {
    Object.keys(sessionStorage)
      .filter((nøkkel) => /^lagrede-sok:[^:]+:sokeord$/.test(nøkkel))
      .forEach((nøkkel) => sessionStorage.removeItem(nøkkel));
  } catch {
    // Uten sessionStorage finnes det ingenting å rydde.
  }
};
if (typeof window !== 'undefined') fjernGamleNøkler();

export const hentSøkeordIMinnet = (
  domene: LagredeSøkDomene,
  filter: string,
): string[] => iMinnet.get(domene)?.[filter] ?? [];

export const lagreSøkeordIMinnet = (
  domene: LagredeSøkDomene,
  filter: string,
  søkeord: string[],
) => {
  const oppdatert = { ...iMinnet.get(domene) };
  delete oppdatert[filter];
  const trygge = søkeord.filter((ord) => !inneholderFødselsnummer(ord));
  if (trygge.length > 0) oppdatert[filter] = trygge;
  // Sist endrede filter står sist, så vi beholder de nyeste.
  iMinnet.set(
    domene,
    Object.fromEntries(Object.entries(oppdatert).slice(-MAKS_ANTALL_FILTRE)),
  );
};
