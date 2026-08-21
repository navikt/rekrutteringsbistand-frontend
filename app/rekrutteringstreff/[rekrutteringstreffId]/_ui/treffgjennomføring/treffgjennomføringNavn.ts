import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';

export const formaterTreffgjennomføringNavn = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  if (fornavn && etternavn) return `${fornavn} ${etternavn}`;
  return fornavn || etternavn || fallback;
};

interface Treffgjennomføringdeltaker {
  personTreffId: string;
  fornavn: string | null;
  etternavn: string | null;
}

export const lagNavnvisning = (treffgjennomføring: TreffgjennomføringDTO) => {
  const nummerPerPerson = new Map(
    treffgjennomføring.deltakernummer.map(({ personTreffId, deltakernummer }) => [
      personTreffId,
      deltakernummer,
    ]),
  );

  return (deltaker: Treffgjennomføringdeltaker, fallback = ''): string => {
    const navn = formaterTreffgjennomføringNavn(
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
  treffgjennomføring: TreffgjennomføringDTO,
): T[] => {
  const nummerPerPerson = new Map(
    treffgjennomføring.deltakernummer.map(({ personTreffId, deltakernummer }) => [
      personTreffId,
      deltakernummer,
    ]),
  );

  return [...deltakere].sort(
    (a, b) =>
      (nummerPerPerson.get(a.personTreffId) ?? Number.MAX_SAFE_INTEGER) -
      (nummerPerPerson.get(b.personTreffId) ?? Number.MAX_SAFE_INTEGER),
  );
};
