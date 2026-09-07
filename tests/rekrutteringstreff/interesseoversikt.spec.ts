import { lagTomVurdering } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/vurdering';
import { lagInteresseoversikt } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/interesseoversikt';
import { expect, test } from '@playwright/test';

test('skiller interesser, registrert status og antall per jobbsøker', () => {
  const oversikt = lagInteresseoversikt({
    interesser: [
      {
        personTreffId: 'test-person-1',
        arbeidsgiverTreffId: 'test-arbeidsgiver-1',
      },
      {
        personTreffId: 'test-person-1',
        arbeidsgiverTreffId: 'test-arbeidsgiver-2',
      },
      {
        personTreffId: 'test-person-2',
        arbeidsgiverTreffId: 'test-arbeidsgiver-1',
      },
    ],
    vurderinger: [lagTomVurdering('test-person-2', 'test-arbeidsgiver-2')],
  });

  expect(oversikt.harInteresse('test-person-1', 'test-arbeidsgiver-2')).toBe(
    true,
  );
  expect(oversikt.harInteresse('test-person-2', 'test-arbeidsgiver-2')).toBe(
    false,
  );
  expect(
    oversikt.harRegistrertStatus('test-person-2', 'test-arbeidsgiver-2'),
  ).toBe(true);
  expect(
    oversikt.harRegistrertStatus('test-person-1', 'test-arbeidsgiver-2'),
  ).toBe(false);
  expect(oversikt.antallInteresser('test-person-1')).toBe(2);
  expect(oversikt.antallInteresser('test-person-2')).toBe(1);
  expect(oversikt.antallInteresser('test-ukjent')).toBe(0);
});

test('gir tom oversikt uten registreringer', () => {
  const oversikt = lagInteresseoversikt({ interesser: [], vurderinger: [] });

  expect(oversikt.harInteresse('test-person', 'test-arbeidsgiver')).toBe(false);
  expect(oversikt.harRegistrertStatus('test-person', 'test-arbeidsgiver')).toBe(
    false,
  );
  expect(oversikt.antallInteresser('test-person')).toBe(0);
});

test('beholder tellingen av registreringer selv om et par forekommer flere ganger', () => {
  const interesse = {
    personTreffId: 'test-person',
    arbeidsgiverTreffId: 'test-arbeidsgiver',
  };
  const oversikt = lagInteresseoversikt({
    interesser: [interesse, interesse],
    vurderinger: [],
  });

  expect(oversikt.antallInteresser('test-person')).toBe(2);
  expect(oversikt.harInteresse('test-person', 'test-arbeidsgiver')).toBe(true);
});

test('holder person- og arbeidsgiveridentifikatorene adskilt', () => {
  const oversikt = lagInteresseoversikt({
    interesser: [
      { personTreffId: 'test:person', arbeidsgiverTreffId: 'arbeidsgiver' },
    ],
    vurderinger: [],
  });

  expect(oversikt.harInteresse('test', 'person:arbeidsgiver')).toBe(false);
  expect(oversikt.harInteresse('test:person', 'arbeidsgiver')).toBe(true);
});
