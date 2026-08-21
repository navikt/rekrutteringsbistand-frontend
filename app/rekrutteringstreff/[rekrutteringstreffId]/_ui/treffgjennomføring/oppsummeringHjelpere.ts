import type { RegistreringForArbeidsgiver } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/registreringAvStatusHjelpere';

export type Hovedstatus =
  | 'AKTUELL'
  | 'KANSKJE'
  | 'IKKE_AKTUELL'
  | 'IKKE_VURDERT';

export interface OppsummeringForArbeidsgiver {
  arbeidsgiverTreffId: string;
  navn: string;
  antallVurdert: number;
  aktuelle: number;
  avtaltIntervju: number;
  formidlet: number;
}

export interface Treffgjennomføringoppsummering {
  antallMøtt: number;
  antallPåmeldte: number;
  antallArbeidsgivere: number;
  antallIntervjuer: number;
  antallKandidater: number;
  aktuelle: number;
  kanskje: number;
  ikkeAktuelle: number;
  ikkeVurdert: number;
  avtaltIntervju: number;
  formidlet: number;
  perArbeidsgiver: OppsummeringForArbeidsgiver[];
}

const STATUSRANGERING: Hovedstatus[] = [
  'AKTUELL',
  'KANSKJE',
  'IKKE_AKTUELL',
  'IKKE_VURDERT',
];

const besteStatus = (en: Hovedstatus, annen: Hovedstatus): Hovedstatus =>
  STATUSRANGERING.indexOf(en) <= STATUSRANGERING.indexOf(annen) ? en : annen;

interface LagOppsummeringInput {
  registreringer: RegistreringForArbeidsgiver[];
  antallMøtt: number;
  antallPåmeldte: number;
  antallIntervjuer: number;
}

export const lagOppsummering = ({
  registreringer,
  antallMøtt,
  antallPåmeldte,
  antallIntervjuer,
}: LagOppsummeringInput): Treffgjennomføringoppsummering => {
  const statusPerKandidat = new Map<string, Hovedstatus>();
  const andreIntervjuKandidater = new Set<string>();
  const formidledeKandidater = new Set<string>();

  for (const { rader } of registreringer) {
    for (const rad of rader) {
      const personTreffId = rad.jobbsøker.personTreffId;
      const status: Hovedstatus = rad.vurdering.vurderingsstatus ?? 'IKKE_VURDERT';
      const kjentStatus = statusPerKandidat.get(personTreffId);
      statusPerKandidat.set(
        personTreffId,
        kjentStatus ? besteStatus(kjentStatus, status) : status,
      );

      if (rad.vurdering.avtaltIntervju) {
        andreIntervjuKandidater.add(personTreffId);
      }
      if (rad.formidlet) {
        formidledeKandidater.add(personTreffId);
      }
    }
  }

  const antallMedStatus = (status: Hovedstatus) =>
    [...statusPerKandidat.values()].filter(
      (kandidatstatus) => kandidatstatus === status,
    ).length;

  return {
    antallMøtt,
    antallPåmeldte,
    antallArbeidsgivere: registreringer.length,
    antallIntervjuer,
    antallKandidater: statusPerKandidat.size,
    aktuelle: antallMedStatus('AKTUELL'),
    kanskje: antallMedStatus('KANSKJE'),
    ikkeAktuelle: antallMedStatus('IKKE_AKTUELL'),
    ikkeVurdert: antallMedStatus('IKKE_VURDERT'),
    avtaltIntervju: andreIntervjuKandidater.size,
    formidlet: formidledeKandidater.size,
    perArbeidsgiver: registreringer.map(({ arbeidsgiver, rader }) => ({
      arbeidsgiverTreffId: arbeidsgiver.arbeidsgiverTreffId,
      navn: arbeidsgiver.navn,
      antallVurdert: rader.filter((rad) => rad.vurdering.vurderingsstatus !== null)
        .length,
      aktuelle: rader.filter((rad) => rad.vurdering.vurderingsstatus === 'AKTUELL')
        .length,
      avtaltIntervju: rader.filter(
        (rad) => rad.vurdering.avtaltIntervju,
      ).length,
      formidlet: rader.filter((rad) => rad.formidlet === true).length,
    })),
  };
};
