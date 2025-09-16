import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import {
  ModiaEventType,
  setModiaContext,
} from '@/app/api/modia/context/setModiaContext';

export function storForbokstavString(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const setModiaBrukerOgNaviger = async (
  href: string,
  fødselsnummer: string,
) => {
  await setModiaContext(ModiaEventType.NY_AKTIV_BRUKER, fødselsnummer).then(
    () => {
      setTimeout(() => {
        window.open(href, '_blank');
      }, 500);
    },
  );
};

export const storBokstavSted = (sted: string) => {
  // Returner stor forbokstav og stor bokstav etter " " og "-" , men ikke stor forbokstav for " og "
  return sted
    .split(' ')
    .map((o) =>
      o.toLowerCase() === 'og'
        ? 'og'
        : o.length === 0
          ? o
          : o[0].toUpperCase() + o.substring(1).toLowerCase(),
    )
    .join(' ');
};

export const storForbokstav = (s: string | null | undefined) => {
  if (s === null || s === undefined || s.length === 0) {
    return s;
  }

  const ord = s.split(' ');
  return ord
    .map((o) =>
      o.length === 0 ? o : o[0].toUpperCase() + o.substring(1).toLowerCase(),
    )
    .join(' ');
};

export const hentKandidatensNavn = (kandidat: KandidatDataSchemaDTO) =>
  `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

export const hentKandidatensØnskedeYrker = (kandidat: KandidatDataSchemaDTO) =>
  kandidat?.yrkeJobbonskerObj?.length === 0
    ? undefined
    : kandidat.yrkeJobbonskerObj
        ?.map((jobbønske) => jobbønske?.styrkBeskrivelse)
        .join(', ');

export const hentKandidatensØnskedeSteder = (
  kandidat: KandidatDataSchemaDTO,
) =>
  kandidat?.geografiJobbonsker?.length === 0
    ? undefined
    : kandidat?.geografiJobbonsker
        ?.map((jobbønske) => jobbønske?.geografiKodeTekst)
        .join(', ');
