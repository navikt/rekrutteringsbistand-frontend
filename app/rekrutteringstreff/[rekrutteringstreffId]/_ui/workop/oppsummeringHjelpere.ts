import type { RegistreringForArbeidsgiver } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/registreringAvStatusHjelpere';

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
  andreIntervju: number;
  formidlet: number;
}

export interface WorkOpOppsummering {
  antallMøtt: number;
  antallPåmeldte: number;
  antallArbeidsgivere: number;
  antallSpeedintervjuer: number;
  antallKandidater: number;
  aktuelle: number;
  kanskje: number;
  ikkeAktuelle: number;
  ikkeVurdert: number;
  andreIntervju: number;
  formidlet: number;
  perArbeidsgiver: OppsummeringForArbeidsgiver[];
}

// En kandidat kan være vurdert hos flere arbeidsgivere. I oppsummeringa telles
// hver kandidat én gang, med den mest positive vurderinga hen har fått.
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
  antallSpeedintervjuer: number;
}

export const lagOppsummering = ({
  registreringer,
  antallMøtt,
  antallPåmeldte,
  antallSpeedintervjuer,
}: LagOppsummeringInput): WorkOpOppsummering => {
  const statusPerKandidat = new Map<string, Hovedstatus>();
  const andreIntervjuKandidater = new Set<string>();
  const formidledeKandidater = new Set<string>();

  for (const { rader } of registreringer) {
    for (const rad of rader) {
      const personTreffId = rad.jobbsøker.personTreffId;
      const status: Hovedstatus = rad.vurdering.vurdering ?? 'IKKE_VURDERT';
      const kjentStatus = statusPerKandidat.get(personTreffId);
      statusPerKandidat.set(
        personTreffId,
        kjentStatus ? besteStatus(kjentStatus, status) : status,
      );

      if (rad.vurdering.andreIntervju) {
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
    antallSpeedintervjuer,
    antallKandidater: statusPerKandidat.size,
    aktuelle: antallMedStatus('AKTUELL'),
    kanskje: antallMedStatus('KANSKJE'),
    ikkeAktuelle: antallMedStatus('IKKE_AKTUELL'),
    ikkeVurdert: antallMedStatus('IKKE_VURDERT'),
    andreIntervju: andreIntervjuKandidater.size,
    formidlet: formidledeKandidater.size,
    perArbeidsgiver: registreringer.map(({ arbeidsgiver, rader }) => ({
      arbeidsgiverTreffId: arbeidsgiver.arbeidsgiverTreffId,
      navn: arbeidsgiver.navn,
      antallVurdert: rader.filter((rad) => rad.vurdering.vurdering !== null)
        .length,
      aktuelle: rader.filter((rad) => rad.vurdering.vurdering === 'AKTUELL')
        .length,
      andreIntervju: rader.filter((rad) => rad.vurdering.andreIntervju).length,
      formidlet: rader.filter((rad) => rad.formidlet === true).length,
    })),
  };
};
