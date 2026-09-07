import {
  formaterDeltakerinitialer,
  formaterDeltakernavn,
  lagJobbsøkeroppslag,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import { expect, test } from '@playwright/test';

test('viser de navnedelene som finnes, eller en reserveverdi', () => {
  expect(formaterDeltakernavn('Testfornavn', 'Testetternavn')).toBe(
    'Testfornavn Testetternavn',
  );
  expect(formaterDeltakernavn('Testfornavn', null)).toBe('Testfornavn');
  expect(formaterDeltakernavn(null, 'Testetternavn')).toBe('Testetternavn');
  expect(formaterDeltakernavn(null, null, 'Ukjent')).toBe('Ukjent');
});

test('bruker store initialer fra alle navnedeler på utskriften', () => {
  expect(formaterDeltakerinitialer('testfornavn', 'prøveetternavn')).toBe('TP');
  expect(
    formaterDeltakerinitialer(
      'Testfornavn Prøvemellomnavn',
      'Eksempeletter Testfamilienavn',
    ),
  ).toBe('TPET');
  expect(formaterDeltakerinitialer('Test-fornavn', 'Prøve-etternavn')).toBe(
    'TFPE',
  );
  expect(formaterDeltakerinitialer('Testfornavn', null)).toBe('T');
  expect(formaterDeltakerinitialer(null, 'Prøveetternavn')).toBe('P');
  expect(formaterDeltakerinitialer(null, null, 'Ukjent')).toBe('Ukjent');
});

test('viser samme deltakernummer med fullt navn og initialer', () => {
  const oppslag = lagJobbsøkeroppslag(
    [
      {
        personTreffId: 'test-med-nummer',
        fornavn: 'Testfornavn',
        etternavn: 'Prøveetternavn',
      },
      {
        personTreffId: 'test-uten-nummer',
        fornavn: 'Eksempelfornavn',
        etternavn: 'Testetternavn',
      },
    ],
    {
      deltakernummer: [{ personTreffId: 'test-med-nummer', deltakernummer: 7 }],
    },
  );
  expect(oppslag.navnPåJobbsøker('test-med-nummer')).toBe(
    '7. Testfornavn Prøveetternavn',
  );
  expect(oppslag.initialerPåJobbsøker('test-med-nummer')).toBe('7. TP');
  expect(oppslag.navnPåJobbsøker('test-uten-nummer')).toBe(
    'Eksempelfornavn Testetternavn',
  );
  expect(oppslag.initialerPåJobbsøker('test-uten-nummer')).toBe('ET');
});

test('håndterer både manglende navn og en ukjent deltaker', () => {
  const oppslag = lagJobbsøkeroppslag(
    [{ personTreffId: 'test-uten-navn', fornavn: null, etternavn: null }],
    { deltakernummer: [] },
  );
  expect(oppslag.navnPåJobbsøker('test-uten-navn')).toBe('test-uten-navn');
  expect(oppslag.initialerPåJobbsøker('test-uten-navn')).toBe('test-uten-navn');
  expect(oppslag.navnPåJobbsøker('test-ukjent')).toBe('Ukjent jobbsøker');
  expect(oppslag.initialerPåJobbsøker('test-ukjent')).toBe('Ukjent jobbsøker');
});
