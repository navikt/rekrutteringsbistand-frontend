import { lagTreffgjennomføring } from './testdata';
import {
  erStegTilgjengelig,
  finnNærmesteTilgjengeligeSteg,
  hentSynligeSteg,
  lagStegposisjon,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import { expect, test } from '@playwright/test';

test('krever oppmøte før romoppsett og rom før interesser på WorkOp', () => {
  const utenOppmøte = lagTreffgjennomføring();
  const medOppmøte = lagTreffgjennomføring({ oppmøte: ['test-person'] });
  const medRom = lagTreffgjennomføring({
    oppmøte: ['test-person'],
    rom: [{ romnummer: 1, jobbsøkere: ['test-person'] }],
  });
  expect(erStegTilgjengelig(2, utenOppmøte, true)).toBe(false);
  expect(erStegTilgjengelig(2, medOppmøte, true)).toBe(true);
  expect(erStegTilgjengelig(3, medOppmøte, true)).toBe(false);
  expect(erStegTilgjengelig(3, medRom, true)).toBe(true);
});

test('krever interesse før intervjufordeling og vurdering åpnes', () => {
  const utenInteresse = lagTreffgjennomføring({
    oppmøte: ['test-person'],
    rom: [{ romnummer: 1, jobbsøkere: ['test-person'] }],
  });
  const medInteresse = lagTreffgjennomføring({
    ...utenInteresse,
    interesser: [
      {
        personTreffId: 'test-person',
        arbeidsgiverTreffId: 'test-arbeidsgiver',
      },
    ],
  });
  for (const steg of [4, 5]) {
    expect(erStegTilgjengelig(steg, utenInteresse, true)).toBe(false);
    expect(erStegTilgjengelig(steg, medInteresse, true)).toBe(true);
  }
});

test('åpner interesser uten rom og skjuler WorkOp-steg på vanlige treff', () => {
  const treff = lagTreffgjennomføring({
    oppmøte: ['test-person'],
    gjeldendeSteg: 'OPPSUMMERING',
  });
  expect(hentSynligeSteg(false).map(({ id }) => id)).toEqual([1, 3, 5, 6]);
  expect(erStegTilgjengelig(2, treff, false)).toBe(false);
  expect(erStegTilgjengelig(4, treff, false)).toBe(false);
  expect(
    erStegTilgjengelig(
      3,
      lagTreffgjennomføring({ oppmøte: ['test-person'] }),
      false,
    ),
  ).toBe(true);
});

test('beholder tidligere besøkte steg selv om registreringene er fjernet', () => {
  const treff = lagTreffgjennomføring({ gjeldendeSteg: 'OPPSUMMERING' });
  expect(
    hentSynligeSteg(true).every(({ id }) =>
      erStegTilgjengelig(id, treff, true),
    ),
  ).toBe(true);
  expect(
    erStegTilgjengelig(
      6,
      lagTreffgjennomføring({ gjeldendeSteg: 'VURDERING' }),
      true,
    ),
  ).toBe(false);
});

test('finner nærmeste tilgjengelige steg ved en utilgjengelig lenke', () => {
  const treff = lagTreffgjennomføring({
    oppmøte: ['test-person'],
    rom: [{ romnummer: 1, jobbsøkere: ['test-person'] }],
  });
  expect(finnNærmesteTilgjengeligeSteg(6, treff, true)).toBe(3);
  expect(finnNærmesteTilgjengeligeSteg(2, treff, false)).toBe(1);
  expect(finnNærmesteTilgjengeligeSteg(-1, treff, true)).toBe(1);
});

test('finner forrige og neste synlige steg rundt aktivt steg', () => {
  const treff = lagTreffgjennomføring({
    oppmøte: ['test-person'],
    gjeldendeSteg: 'VURDERING',
  });

  const workOp = lagStegposisjon(4, treff, true);
  expect(workOp.aktivtSteg).toBe(4);
  expect(workOp.forrigeSteg?.id).toBe(3);
  expect(workOp.nesteSteg?.id).toBe(5);
  expect(workOp.posisjonFor(4)).toBe(4);

  const vanlig = lagStegposisjon(3, treff, false);
  expect(vanlig.forrigeSteg?.id).toBe(1);
  expect(vanlig.nesteSteg?.id).toBe(5);
  expect(vanlig.posisjonFor(5)).toBe(3);
  expect(vanlig.posisjonFor(2)).toBe(1);
});

test('bruker steget fra URL-en direkte før data er hentet', () => {
  const posisjon = lagStegposisjon(6, undefined, true);
  expect(posisjon.aktivtSteg).toBe(6);
  expect(posisjon.forrigeSteg?.id).toBe(5);
  expect(posisjon.nesteSteg).toBeUndefined();
});
