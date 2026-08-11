import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { VurderingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { lagOppsummering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/oppsummeringHjelpere';
import type {
  RegistreringForArbeidsgiver,
  RegistreringsRad,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/registreringAvStatusHjelpere';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

const lagJobbsøker = (id: string): JobbsøkerDTO => ({
  personTreffId: id,
  fødselsnummer: `0000000000${id}`,
  fornavn: `Testfornavn ${id}`,
  etternavn: `Testetternavn ${id}`,
  status: JobbsøkerStatus.SVART_JA,
  lagtTilDato: null,
  lagtTilAv: null,
  lagtTilAvNavn: null,
  alder: null,
  innsatsgruppe: null,
  minsideHendelser: [],
});

const lagRad = (
  personTreffId: string,
  arbeidsgiverTreffId: string,
  vurdering: VurderingDTO['vurdering'],
  ekstra: Partial<Pick<RegistreringsRad, 'formidlet'>> & {
    andregangsintervju?: boolean;
  } = {},
): RegistreringsRad => ({
  jobbsøker: lagJobbsøker(personTreffId),
  vurdering: {
    personTreffId,
    arbeidsgiverTreffId,
    vurdering,
    notater: [],
    andregangsintervju: ekstra.andregangsintervju ?? false,
    andregangsintervjuDato: null,
    jobbtilbud: false,
  },
  ønsketIntervju: false,
  sattOppTilIntervju: false,
  formidlet: ekstra.formidlet ?? false,
});

const lagRegistrering = (
  arbeidsgiverTreffId: string,
  rader: RegistreringsRad[],
): RegistreringForArbeidsgiver => ({
  arbeidsgiver: {
    arbeidsgiverTreffId,
    organisasjonsnummer: `99900000${arbeidsgiverTreffId}`,
    navn: `Testarbeidsgiver ${arbeidsgiverTreffId}`,
    status: 'AKTIV',
    gateadresse: null,
    postnummer: null,
    poststed: null,
  } as ArbeidsgiverDTO & { arbeidsgiverTreffId: string },
  rader,
});

test('teller hver kandidat én gang med den mest positive vurderinga', () => {
  const oppsummering = lagOppsummering({
    registreringer: [
      lagRegistrering('ag1', [
        lagRad('p1', 'ag1', 'IKKE_AKTUELL'),
        lagRad('p2', 'ag1', 'KANSKJE'),
      ]),
      lagRegistrering('ag2', [
        lagRad('p1', 'ag2', 'AKTUELL'),
        lagRad('p2', 'ag2', 'IKKE_AKTUELL'),
      ]),
    ],
    antallMøtt: 2,
    antallPåmeldte: 5,
    antallIntervjuer: 4,
  });

  expect(oppsummering.antallKandidater).toBe(2);
  expect(oppsummering.aktuelle).toBe(1);
  expect(oppsummering.kanskje).toBe(1);
  expect(oppsummering.ikkeAktuelle).toBe(0);
  expect(oppsummering.ikkeVurdert).toBe(0);
});

test('regner kandidater uten vurdering som ikke vurdert', () => {
  const oppsummering = lagOppsummering({
    registreringer: [
      lagRegistrering('ag1', [
        lagRad('p1', 'ag1', null),
        lagRad('p2', 'ag1', 'AKTUELL'),
      ]),
    ],
    antallMøtt: 2,
    antallPåmeldte: 2,
    antallIntervjuer: 2,
  });

  expect(oppsummering.ikkeVurdert).toBe(1);
  expect(oppsummering.aktuelle).toBe(1);
});

test('teller andre intervju og formidling på tvers av arbeidsgivere', () => {
  const oppsummering = lagOppsummering({
    registreringer: [
      lagRegistrering('ag1', [
        lagRad('p1', 'ag1', 'AKTUELL', { andregangsintervju: true }),
        lagRad('p2', 'ag1', 'AKTUELL', { formidlet: true }),
      ]),
      lagRegistrering('ag2', [
        lagRad('p1', 'ag2', 'AKTUELL', { andregangsintervju: true }),
      ]),
    ],
    antallMøtt: 2,
    antallPåmeldte: 2,
    antallIntervjuer: 3,
  });

  expect(oppsummering.andregangsintervju).toBe(1);
  expect(oppsummering.formidlet).toBe(1);
});

test('summerer per arbeidsgiver', () => {
  const oppsummering = lagOppsummering({
    registreringer: [
      lagRegistrering('ag1', [
        lagRad('p1', 'ag1', 'AKTUELL', { andregangsintervju: true }),
        lagRad('p2', 'ag1', 'IKKE_AKTUELL'),
        lagRad('p3', 'ag1', null),
      ]),
    ],
    antallMøtt: 3,
    antallPåmeldte: 3,
    antallIntervjuer: 3,
  });

  expect(oppsummering.perArbeidsgiver).toEqual([
    {
      arbeidsgiverTreffId: 'ag1',
      navn: 'Testarbeidsgiver ag1',
      antallVurdert: 2,
      aktuelle: 1,
      andregangsintervju: 1,
      formidlet: 0,
    },
  ]);
  expect(oppsummering.antallArbeidsgivere).toBe(1);
});

test('gir nullstilt oppsummering uten registreringer', () => {
  const oppsummering = lagOppsummering({
    registreringer: [],
    antallMøtt: 0,
    antallPåmeldte: 0,
    antallIntervjuer: 0,
  });

  expect(oppsummering.antallKandidater).toBe(0);
  expect(oppsummering.aktuelle).toBe(0);
  expect(oppsummering.perArbeidsgiver).toEqual([]);
});
