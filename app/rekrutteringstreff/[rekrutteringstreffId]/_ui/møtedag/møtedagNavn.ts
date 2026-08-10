import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

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
