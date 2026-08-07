import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

/**
 * Møtedagen viser navn med fornavn først, fordi navnene der leses høyt og søkes
 * opp i lista mens dagen pågår. Resten av rekrutteringstreffet sorterer og
 * viser på etternavn.
 */
export const formaterMøtedagNavn = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  if (fornavn && etternavn) return `${fornavn} ${etternavn}`;
  return fornavn || etternavn || fallback;
};

interface Møtedagdeltaker {
  personTreffId: string;
  fornavn: string | null;
  etternavn: string | null;
}

/**
 * Navnevisningen på møtedagen, på formen «3. Fornavn Etternavn».
 *
 * Nummeret står først med vilje. Det er nummeret som står på det fysiske kortet
 * jobbsøkeren bærer, og som arbeidsgiverne noterer og snakker om under
 * intervjuene. Fordi teksten kuttes fra høyre når plassen er trang, overlever
 * nummeret en avkorting som ellers ville spist navnet.
 *
 * Jobbsøkere uten nummer vises med bare navnet. Det gjelder dem som ikke er
 * registrert som møtt, og møtedager fra før nummereringen fantes – men også
 * alle treff som ikke er WorkOp. Kortbunken er en WorkOp-ting, så der deles det
 * ikke ut numre, og da er `deltakernummer` tom. Visningen faller dermed tilbake
 * til rent navn av seg selv, uten at komponentene trenger å vite hvilken
 * variant av møtedagen de tegner.
 */
export const lagNavnvisning = (møtedag: MøtedagDTO) => {
  const nummerPerPerson = new Map(
    møtedag.deltakernummer.map(({ personTreffId, nummer }) => [
      personTreffId,
      nummer,
    ]),
  );

  return (deltaker: Møtedagdeltaker, fallback = ''): string => {
    const navn = formaterMøtedagNavn(
      deltaker.fornavn,
      deltaker.etternavn,
      fallback,
    );
    const nummer = nummerPerPerson.get(deltaker.personTreffId);
    return nummer === undefined ? navn : `${nummer}. ${navn}`;
  };
};

export type Navnvisning = ReturnType<typeof lagNavnvisning>;

/**
 * Sorterer fortløpende på deltakernummer, slik at lista leses som kortbunken:
 * 1, 2, 3 … Jobbsøkere uten nummer havner sist.
 */
export const sorterPåDeltakernummer = <T extends { personTreffId: string }>(
  deltakere: T[],
  møtedag: MøtedagDTO,
): T[] => {
  const nummerPerPerson = new Map(
    møtedag.deltakernummer.map(({ personTreffId, nummer }) => [
      personTreffId,
      nummer,
    ]),
  );

  return [...deltakere].sort(
    (a, b) =>
      (nummerPerPerson.get(a.personTreffId) ?? Number.MAX_SAFE_INTEGER) -
      (nummerPerPerson.get(b.personTreffId) ?? Number.MAX_SAFE_INTEGER),
  );
};
