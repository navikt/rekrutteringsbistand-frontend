import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type {
  TreffgjennomføringDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import {
  harVurderingsinnhold,
  lagTomVurdering,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/vurdering';
import {
  harArbeidsgiverTreffId,
  type ArbeidsgiverMedId,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';

export interface VurderingsradData {
  jobbsøker: JobbsøkerDTO;
  vurdering: VurderingDTO;
  harInteresse: boolean;
  sattOppTilIntervju: boolean;
  formidlet: boolean | null;
}

export interface VurderingerForArbeidsgiver {
  arbeidsgiver: ArbeidsgiverMedId;
  rader: VurderingsradData[];
}

interface Vurderingsgrunnlag {
  treffgjennomføring: TreffgjennomføringDTO;
  jobbsøkere: JobbsøkerDTO[];
  formidlinger?: Formidling[];
}

const finnFormidledePersonTreffIder = (
  formidlinger: Formidling[] | undefined,
  arbeidsgiverTreffId: string,
): Set<string> | null =>
  formidlinger === undefined
    ? null
    : new Set(
        formidlinger.flatMap((formidling) =>
          !formidling.sperret &&
          formidling.arbeidsgiverTreffId === arbeidsgiverTreffId &&
          formidling.personTreffId !== null
            ? [formidling.personTreffId]
            : [],
        ),
      );

const lagVurderingerForArbeidsgiver = (
  arbeidsgiver: ArbeidsgiverMedId,
  { treffgjennomføring, jobbsøkere, formidlinger }: Vurderingsgrunnlag,
  jobbsøkerePerId: Map<string, JobbsøkerDTO>,
): VurderingerForArbeidsgiver => {
  const { arbeidsgiverTreffId } = arbeidsgiver;
  const interessertePersonTreffIder = new Set(
    treffgjennomføring.interesser
      .filter(
        (interesse) => interesse.arbeidsgiverTreffId === arbeidsgiverTreffId,
      )
      .map((interesse) => interesse.personTreffId),
  );
  const intervjufordeling = treffgjennomføring.intervjufordelinger.find(
    (fordeling) => fordeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
  );
  const inkludertePersonTreffIder = new Set(
    intervjufordeling?.inkludertePersonTreffIder ?? [],
  );
  const vurderinger = treffgjennomføring.vurderinger.filter(
    (vurdering) =>
      vurdering.arbeidsgiverTreffId === arbeidsgiverTreffId &&
      harVurderingsinnhold(vurdering),
  );
  const vurderingPerPerson = new Map(
    vurderinger.map((vurdering) => [vurdering.personTreffId, vurdering]),
  );
  const formidledePersonTreffIder = finnFormidledePersonTreffIder(
    formidlinger,
    arbeidsgiverTreffId,
  );
  const personTreffIder = finnPersonerMedRegistreringer({
    jobbsøkere,
    inkludertePersonTreffIder,
    interessertePersonTreffIder,
    vurderinger,
    formidledePersonTreffIder,
  });

  return {
    arbeidsgiver,
    rader: personTreffIder.flatMap((personTreffId) => {
      const jobbsøker = jobbsøkerePerId.get(personTreffId);
      if (!jobbsøker) return [];

      return [
        {
          jobbsøker,
          vurdering:
            vurderingPerPerson.get(personTreffId) ??
            lagTomVurdering(personTreffId, arbeidsgiverTreffId),
          harInteresse: interessertePersonTreffIder.has(personTreffId),
          sattOppTilIntervju: inkludertePersonTreffIder.has(personTreffId),
          formidlet: formidledePersonTreffIder?.has(personTreffId) ?? null,
        },
      ];
    }),
  };
};

const finnPersonerMedRegistreringer = ({
  jobbsøkere,
  inkludertePersonTreffIder,
  interessertePersonTreffIder,
  vurderinger,
  formidledePersonTreffIder,
}: {
  jobbsøkere: JobbsøkerDTO[];
  inkludertePersonTreffIder: Set<string>;
  interessertePersonTreffIder: Set<string>;
  vurderinger: VurderingDTO[];
  formidledePersonTreffIder: Set<string> | null;
}): string[] => [
  ...new Set([
    ...inkludertePersonTreffIder,
    ...jobbsøkere
      .filter((jobbsøker) =>
        interessertePersonTreffIder.has(jobbsøker.personTreffId),
      )
      .map((jobbsøker) => jobbsøker.personTreffId),
    ...vurderinger.map((vurdering) => vurdering.personTreffId),
    ...(formidledePersonTreffIder ?? []),
  ]),
];

export const lagVurderingsoversikt = ({
  arbeidsgivere,
  ...grunnlag
}: Vurderingsgrunnlag & {
  arbeidsgivere: ArbeidsgiverDTO[];
}): VurderingerForArbeidsgiver[] => {
  const jobbsøkerePerId = new Map(
    grunnlag.jobbsøkere.map((jobbsøker) => [
      jobbsøker.personTreffId,
      jobbsøker,
    ]),
  );

  return arbeidsgivere
    .filter(harArbeidsgiverTreffId)
    .map((arbeidsgiver) =>
      lagVurderingerForArbeidsgiver(arbeidsgiver, grunnlag, jobbsøkerePerId),
    );
};
