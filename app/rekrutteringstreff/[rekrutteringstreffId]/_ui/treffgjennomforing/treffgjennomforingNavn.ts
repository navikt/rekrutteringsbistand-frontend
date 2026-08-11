import type { TreffgjennomforingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';

export const formaterTreffgjennomforingNavn = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  if (fornavn && etternavn) return `${fornavn} ${etternavn}`;
  return fornavn || etternavn || fallback;
};

interface Treffgjennomforingdeltaker {
  personTreffId: string;
  fornavn: string | null;
  etternavn: string | null;
}

export const lagNavnvisning = (treffgjennomforing: TreffgjennomforingDTO) => {
  const nummerPerPerson = new Map(
    treffgjennomforing.deltakernummer.map(({ personTreffId, nummer }) => [
      personTreffId,
      nummer,
    ]),
  );

  return (deltaker: Treffgjennomforingdeltaker, fallback = ''): string => {
    const navn = formaterTreffgjennomforingNavn(
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
  treffgjennomforing: TreffgjennomforingDTO,
): T[] => {
  const nummerPerPerson = new Map(
    treffgjennomforing.deltakernummer.map(({ personTreffId, nummer }) => [
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
