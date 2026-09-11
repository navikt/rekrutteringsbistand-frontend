import type {
  InteresseDTO,
  TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

const grupperArbeidsgiverePerPerson = (registreringer: InteresseDTO[]) => {
  const arbeidsgiverePerPerson = new Map<string, Set<string>>();
  for (const { personTreffId, arbeidsgiverTreffId } of registreringer) {
    const arbeidsgivere =
      arbeidsgiverePerPerson.get(personTreffId) ?? new Set<string>();
    arbeidsgivere.add(arbeidsgiverTreffId);
    arbeidsgiverePerPerson.set(personTreffId, arbeidsgivere);
  }
  return arbeidsgiverePerPerson;
};

export const lagInteresseoversikt = ({
  interesser,
  vurderinger,
}: Pick<TreffgjennomføringDTO, 'interesser' | 'vurderinger'>) => {
  const interesserPerPerson = grupperArbeidsgiverePerPerson(interesser);
  const vurderingerPerPerson = grupperArbeidsgiverePerPerson(vurderinger);
  const antallPerPerson = new Map<string, number>();
  for (const { personTreffId } of interesser) {
    antallPerPerson.set(
      personTreffId,
      (antallPerPerson.get(personTreffId) ?? 0) + 1,
    );
  }

  return {
    harInteresse: (personTreffId: string, arbeidsgiverTreffId: string) =>
      interesserPerPerson.get(personTreffId)?.has(arbeidsgiverTreffId) ?? false,
    harRegistrertStatus: (personTreffId: string, arbeidsgiverTreffId: string) =>
      vurderingerPerPerson.get(personTreffId)?.has(arbeidsgiverTreffId) ??
      false,
    antallInteresser: (personTreffId: string) =>
      antallPerPerson.get(personTreffId) ?? 0,
  };
};
