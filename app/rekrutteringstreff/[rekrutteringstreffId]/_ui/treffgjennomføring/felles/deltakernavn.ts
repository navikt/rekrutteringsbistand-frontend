import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

type Deltakernummergrunnlag = Pick<TreffgjennomføringDTO, 'deltakernummer'>;

const lagDeltakernummeroppslag = (treffgjennomføring: Deltakernummergrunnlag) =>
  new Map(
    treffgjennomføring.deltakernummer.map(
      ({ personTreffId, deltakernummer }) => [personTreffId, deltakernummer],
    ),
  );

export const formaterDeltakernavn = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  if (fornavn && etternavn) return `${fornavn} ${etternavn}`;
  return fornavn || etternavn || fallback;
};

export const formaterDeltakerinitialer = (
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

interface DeltakerMedNavn {
  personTreffId: string;
  fornavn: string | null;
  etternavn: string | null;
}

export const lagNavnvisning = (treffgjennomføring: Deltakernummergrunnlag) => {
  const nummerPerPerson = lagDeltakernummeroppslag(treffgjennomføring);

  return (deltaker: DeltakerMedNavn, fallback = ''): string => {
    const navn = formaterDeltakernavn(
      deltaker.fornavn,
      deltaker.etternavn,
      fallback,
    );
    const nummer = nummerPerPerson.get(deltaker.personTreffId);
    return nummer === undefined ? navn : `${nummer}. ${navn}`;
  };
};

const lagInitialvisning = (treffgjennomføring: Deltakernummergrunnlag) => {
  const nummerPerPerson = lagDeltakernummeroppslag(treffgjennomføring);

  return (deltaker: DeltakerMedNavn, fallback = ''): string => {
    const initialer = formaterDeltakerinitialer(
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

export const lagJobbsøkeroppslag = (
  jobbsøkere: DeltakerMedNavn[],
  treffgjennomføring: Deltakernummergrunnlag,
) => {
  const jobbsøkerePerId = new Map(
    jobbsøkere.map((jobbsøker) => [jobbsøker.personTreffId, jobbsøker]),
  );
  const visNavn = lagNavnvisning(treffgjennomføring);
  const visInitialer = lagInitialvisning(treffgjennomføring);

  return {
    navnPåJobbsøker: (personTreffId: string) => {
      const jobbsøker = jobbsøkerePerId.get(personTreffId);
      return jobbsøker ? visNavn(jobbsøker, personTreffId) : 'Ukjent jobbsøker';
    },
    initialerPåJobbsøker: (personTreffId: string) => {
      const jobbsøker = jobbsøkerePerId.get(personTreffId);
      return jobbsøker
        ? visInitialer(jobbsøker, personTreffId)
        : 'Ukjent jobbsøker';
    },
  };
};

export const sorterPåDeltakernummer = <T extends { personTreffId: string }>(
  deltakere: T[],
  treffgjennomføring: Deltakernummergrunnlag,
): T[] => {
  const nummerPerPerson = lagDeltakernummeroppslag(treffgjennomføring);

  return [...deltakere].sort(
    (a, b) =>
      (nummerPerPerson.get(a.personTreffId) ?? Number.MAX_SAFE_INTEGER) -
      (nummerPerPerson.get(b.personTreffId) ?? Number.MAX_SAFE_INTEGER),
  );
};
