import { jobbsøkerDetaljtekst } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/HendelseLabel';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

const navnPåArbeidsgiver = (arbeidsgiverTreffId: string) =>
  arbeidsgiverTreffId === 'test-arbeidsgiver'
    ? 'Eksempelbakeriet AS'
    : undefined;

test('vurderingen viser arbeidsgiveren og overgangen', () => {
  expect(
    jobbsøkerDetaljtekst(
      JobbsøkerHendelsestype.VURDERT,
      {
        arbeidsgiverTreffId: 'test-arbeidsgiver',
        vurdering: 'IKKE_AKTUELL',
        forrigeVurdering: 'AKTUELL',
      },
      navnPåArbeidsgiver,
    ),
  ).toBe('Eksempelbakeriet AS · aktuell → ikke aktuell');
});

test('ukjent arbeidsgiver utelates', () => {
  expect(
    jobbsøkerDetaljtekst(
      JobbsøkerHendelsestype.VURDERT,
      { arbeidsgiverTreffId: 'slettet-arbeidsgiver', vurdering: 'KANSKJE' },
      navnPåArbeidsgiver,
    ),
  ).toBe('ingen vurdering → kanskje');
});

test('jobbtilbud viser bare arbeidsgiveren', () => {
  expect(
    jobbsøkerDetaljtekst(
      JobbsøkerHendelsestype.JOBBTILBUD_GITT,
      { arbeidsgiverTreffId: 'test-arbeidsgiver' },
      navnPåArbeidsgiver,
    ),
  ).toBe('Eksempelbakeriet AS');
});

test('endret dato for 2. intervju viser ny dato, eller at den er fjernet', () => {
  expect(
    jobbsøkerDetaljtekst(JobbsøkerHendelsestype.AVTALT_INTERVJU_DATO_ENDRET, {
      dato: '2026-09-01',
    }),
  ).toBe('Ny dato 01.09.2026');
  expect(
    jobbsøkerDetaljtekst(JobbsøkerHendelsestype.AVTALT_INTERVJU_DATO_ENDRET, {
      dato: null,
    }),
  ).toBe('Dato fjernet');
});
