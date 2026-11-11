import { utenFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';

/**
 * Søkeord står ikke i URL-en. For at søket skal være uendret når veilederen åpner et kort og går tilbake,
 * husker vi søkeordene per filter i minnet. Kortene i søkene bruker klientnavigering, så minnet står seg.
 * Søkeordene er borte etter refresh, og de skrives aldri til nettleserlagring. Søkeord som kan være et
 * fødselsnummer, også når nummeret er delt over flere søkeord, huskes ikke, som når et søk lagres.
 *
 * Minnenøkkelen er domenet, eller domenet og siden når samme søk brukes flere steder. Da følger ikke søkeord fra
 * kandidatsøket med inn i «Finn jobbsøkere» for en stilling eller et treff.
 */
const MAKS_ANTALL_FILTRE = 20;

type SøkeordPerFilter = Record<string, string[]>;

const iMinnet = new Map<string, SøkeordPerFilter>();

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
  minnenøkkel: string,
  filter: string,
): string[] => iMinnet.get(minnenøkkel)?.[filter] ?? [];

export const lagreSøkeordIMinnet = (
  minnenøkkel: string,
  filter: string,
  søkeord: string[],
) => {
  const oppdatert = { ...iMinnet.get(minnenøkkel) };
  delete oppdatert[filter];
  const trygge = utenFødselsnummer(søkeord);
  if (trygge.length > 0) oppdatert[filter] = trygge;
  // Sist endrede filter står sist, så vi beholder de nyeste.
  iMinnet.set(
    minnenøkkel,
    Object.fromEntries(Object.entries(oppdatert).slice(-MAKS_ANTALL_FILTRE)),
  );
};
