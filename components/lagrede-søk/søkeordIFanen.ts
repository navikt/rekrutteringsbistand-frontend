import type { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { inneholderFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';

/**
 * Søkeord står ikke i URL-en. For at søket skal være uendret når veilederen åpner et treff og går tilbake,
 * husker vi søkeordene per filter i sessionStorage. De gjelder bare fanen og forsvinner når den lukkes.
 * Søkeord som kan være et fødselsnummer, huskes ikke, som når et søk lagres.
 */
const MAKS_ANTALL_FILTRE = 20;

const nøkkel = (domene: LagredeSøkDomene) => `lagrede-sok:${domene}:sokeord`;

type SøkeordPerFilter = Record<string, string[]>;

const les = (domene: LagredeSøkDomene): SøkeordPerFilter => {
  try {
    const verdi = JSON.parse(sessionStorage.getItem(nøkkel(domene)) ?? '{}');
    return verdi && typeof verdi === 'object' && !Array.isArray(verdi)
      ? (verdi as SøkeordPerFilter)
      : {};
  } catch {
    return {};
  }
};

export const hentSøkeordIFanen = (
  domene: LagredeSøkDomene,
  filter: string,
): string[] => {
  const søkeord = les(domene)[filter];
  return Array.isArray(søkeord) &&
    søkeord.every((ord) => typeof ord === 'string')
    ? søkeord
    : [];
};

export const lagreSøkeordIFanen = (
  domene: LagredeSøkDomene,
  filter: string,
  søkeord: string[],
) => {
  try {
    const oppdatert = les(domene);
    delete oppdatert[filter];
    const trygge = søkeord.filter((ord) => !inneholderFødselsnummer(ord));
    if (trygge.length > 0) oppdatert[filter] = trygge;
    // Sist endrede filter står sist, så vi beholder de nyeste.
    const nyeste = Object.entries(oppdatert).slice(-MAKS_ANTALL_FILTRE);
    sessionStorage.setItem(
      nøkkel(domene),
      JSON.stringify(Object.fromEntries(nyeste)),
    );
  } catch {
    // Uten sessionStorage husker vi ikke søkeordene, men søket virker.
  }
};
