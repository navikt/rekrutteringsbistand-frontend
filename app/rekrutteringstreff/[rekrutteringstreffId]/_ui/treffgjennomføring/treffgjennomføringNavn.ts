import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';

export const formaterTreffgjennomføringNavn = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  if (fornavn && etternavn) return `${fornavn} ${etternavn}`;
  return fornavn || etternavn || fallback;
};

export const formaterTreffgjennomføringInitialer = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  const deler = [fornavn, etternavn]
    .filter((navn): navn is string => Boolean(navn && navn.trim().length > 0))
    .flatMap((navn) => navn.trim().split(/[\s-]+/))
    .map((del) => del[0]?.toUpperCase())
    .filter(Boolean);

  if (deler.length === 0) return fallback;
  return deler.join('');
};

interface Treffgjennomføringdeltaker {
  personTreffId: string;
  fornavn: string | null;
  etternavn: string | null;
}

export const lagNavnvisning = (treffgjennomføring: TreffgjennomføringDTO) => {
  const nummerPerPerson = new Map(
    treffgjennomføring.deltakernummer.map(
      ({ personTreffId, deltakernummer }) => [personTreffId, deltakernummer],
    ),
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

export const lagInitialvisning = (
  treffgjennomføring: TreffgjennomføringDTO,
) => {
  const nummerPerPerson = new Map(
    treffgjennomføring.deltakernummer.map(
      ({ personTreffId, deltakernummer }) => [personTreffId, deltakernummer],
    ),
  );

  return (deltaker: Treffgjennomføringdeltaker, fallback = ''): string => {
    const initialer = formaterTreffgjennomføringInitialer(
      deltaker.fornavn,
      deltaker.etternavn,
      fallback,
    );
    const nummer = nummerPerPerson.get(deltaker.personTreffId);
    if (nummer === undefined) return initialer;
    return initialer ? `${nummer}. ${initialer}` : `${nummer}.`;
  };
};

export type Navnvisning = ReturnType<typeof lagNavnvisning>;
export type Initialvisning = ReturnType<typeof lagInitialvisning>;

export const sorterPåDeltakernummer = <T extends { personTreffId: string }>(
  deltakere: T[],
  treffgjennomføring: TreffgjennomføringDTO,
): T[] => {
  const nummerPerPerson = new Map(
    treffgjennomføring.deltakernummer.map(
      ({ personTreffId, deltakernummer }) => [personTreffId, deltakernummer],
    ),
  );

  return [...deltakere].sort(
    (a, b) =>
      (nummerPerPerson.get(a.personTreffId) ?? Number.MAX_SAFE_INTEGER) -
      (nummerPerPerson.get(b.personTreffId) ?? Number.MAX_SAFE_INTEGER),
  );
};
