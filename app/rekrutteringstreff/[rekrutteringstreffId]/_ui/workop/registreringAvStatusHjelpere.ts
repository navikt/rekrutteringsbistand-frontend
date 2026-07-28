import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type {
  MøtedagDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

type ArbeidsgiverMedId = ArbeidsgiverDTO & {
  arbeidsgiverTreffId: string;
};

export interface RegistreringsRad {
  jobbsøker: JobbsøkerDTO;
  vurdering: VurderingDTO;
  ønsketIntervju: boolean;
  sattOppTilSpeedintervju: boolean;
  formidlet: boolean | null;
}

export interface RegistreringForArbeidsgiver {
  arbeidsgiver: ArbeidsgiverMedId;
  rader: RegistreringsRad[];
}

interface LagRegistreringAvStatusInput {
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  formidlinger?: Formidling[];
}

const tomVurdering = (
  personTreffId: string,
  arbeidsgiverTreffId: string,
): VurderingDTO => ({
  personTreffId,
  arbeidsgiverTreffId,
  vurdering: null,
  andreIntervju: false,
  jobbtilbud: false,
});

export const lagRegistreringAvStatus = ({
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  formidlinger,
}: LagRegistreringAvStatusInput): RegistreringForArbeidsgiver[] => {
  const jobbsøkerePerId = new Map(
    jobbsøkere.map((jobbsøker) => [jobbsøker.personTreffId, jobbsøker]),
  );

  return arbeidsgivere
    .filter((arbeidsgiver): arbeidsgiver is ArbeidsgiverMedId =>
      Boolean(arbeidsgiver.arbeidsgiverTreffId),
    )
    .map((arbeidsgiver) => {
      const arbeidsgiverTreffId = arbeidsgiver.arbeidsgiverTreffId;
      const ønskedePersonTreffIder = new Set(
        møtedag.ønsker
          .filter((ønske) => ønske.arbeidsgiverTreffId === arbeidsgiverTreffId)
          .map((ønske) => ønske.personTreffId),
      );
      const intervjufordeling = møtedag.intervjufordelinger.find(
        (fordeling) => fordeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
      );
      const inkludertePersonTreffIder =
        intervjufordeling?.inkludertePersonTreffIder ?? [];
      const inkluderte = new Set(inkludertePersonTreffIder);
      const vurderinger = møtedag.vurderinger.filter(
        (vurdering) =>
          vurdering.arbeidsgiverTreffId === arbeidsgiverTreffId &&
          (vurdering.vurdering !== null ||
            vurdering.andreIntervju ||
            vurdering.jobbtilbud),
      );
      const vurderingPerPerson = new Map(
        vurderinger.map((vurdering) => [vurdering.personTreffId, vurdering]),
      );
      const formidledeFødselsnumre =
        formidlinger === undefined
          ? null
          : new Set(
              formidlinger
                .filter(
                  (formidling) =>
                    !formidling.sperret &&
                    formidling.orgnr === arbeidsgiver.organisasjonsnummer &&
                    formidling.fødselsnummer !== null,
                )
                .map((formidling) => formidling.fødselsnummer),
            );
      const formidledePersonTreffIder =
        formidledeFødselsnumre === null
          ? []
          : jobbsøkere
              .filter((jobbsøker) =>
                formidledeFødselsnumre.has(jobbsøker.fødselsnummer),
              )
              .map((jobbsøker) => jobbsøker.personTreffId);
      const personTreffIder = [
        ...new Set([
          ...inkludertePersonTreffIder,
          ...jobbsøkere
            .filter((jobbsøker) =>
              ønskedePersonTreffIder.has(jobbsøker.personTreffId),
            )
            .map((jobbsøker) => jobbsøker.personTreffId),
          ...vurderinger.map((vurdering) => vurdering.personTreffId),
          ...formidledePersonTreffIder,
        ]),
      ];

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
                tomVurdering(personTreffId, arbeidsgiverTreffId),
              ønsketIntervju: ønskedePersonTreffIder.has(personTreffId),
              sattOppTilSpeedintervju: inkluderte.has(personTreffId),
              formidlet:
                formidledeFødselsnumre === null
                  ? null
                  : formidledeFødselsnumre.has(jobbsøker.fødselsnummer),
            },
          ];
        }),
      };
    });
};
