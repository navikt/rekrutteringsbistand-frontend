import { KandidatSchemaDTO } from '../api/kandidatsok/types';

export function storForbokstavString(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const storForbokstav = (s: string | null) => {
  if (s === null || s.length === 0) {
    return s;
  }

  const ord = s.split(' ');
  return ord.map((o) =>
    o.length === 0 ? o : o[0].toUpperCase() + o.substring(1).toLowerCase(),
  );
};

export const hentKandidatensNavn = (kandidat: KandidatSchemaDTO) =>
  `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

export const hentKandidatensØnskedeYrker = (kandidat: KandidatSchemaDTO) =>
  kandidat.yrkeJobbonskerObj.length === 0
    ? undefined
    : kandidat.yrkeJobbonskerObj
        .map((jobbønske) => jobbønske.styrkBeskrivelse)
        .join(', ');

export const hentKandidatensØnskedeSteder = (kandidat: KandidatSchemaDTO) =>
  kandidat.geografiJobbonsker.length === 0
    ? undefined
    : kandidat.geografiJobbonsker
        .map((jobbønske) => jobbønske.geografiKodeTekst)
        .join(', ');
