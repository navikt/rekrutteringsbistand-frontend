import { lagTreffgjennomføring } from './testdata';
import {
  erStegTilgjengelig,
  finnNærmesteTilgjengeligeSteg,
  hentSynligeSteg,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import { åpneSteg } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/åpneSteg';
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

  const treffVurderingUtenRegistreringer = lagTreffgjennomføring({
    gjeldendeSteg: 'VURDERING',
    oppmøte: [],
    rom: [],
    interesser: [],
  });
  for (const steg of [1, 2, 3, 4, 5]) {
    expect(
      erStegTilgjengelig(steg, treffVurderingUtenRegistreringer, true),
    ).toBe(true);
  }

  expect(
    erStegTilgjengelig(
      6,
      lagTreffgjennomføring({ gjeldendeSteg: 'VURDERING' }),
      true,
    ),
  ).toBe(true);
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

test('oppsummeringen åpnes etter vurderingssteget uten registrerte vurderinger', () => {
  for (const erWorkOp of [true, false]) {
    expect(
      erStegTilgjengelig(
        6,
        lagTreffgjennomføring({ gjeldendeSteg: 'FORDELING' }),
        erWorkOp,
      ),
    ).toBe(false);
    expect(
      erStegTilgjengelig(
        6,
        lagTreffgjennomføring({ gjeldendeSteg: 'VURDERING' }),
        erWorkOp,
      ),
    ).toBe(true);
  }
});

test('ukjente steg er aldri tilgjengelige', () => {
  const treff = lagTreffgjennomføring({ gjeldendeSteg: 'OPPSUMMERING' });
  for (const steg of [-1, 0, 7]) {
    expect(erStegTilgjengelig(steg, treff, true)).toBe(false);
  }
});

test('gjenbesøk med tomme registreringer gjør ingen API-kall', async () => {
  const treff = lagTreffgjennomføring({ gjeldendeSteg: 'OPPSUMMERING' });
  const uventetLagring = async () => {
    throw new Error('Gjenbesøk skal ikke lagre');
  };
  for (const erWorkOp of [true, false]) {
    for (const steg of hentSynligeSteg(erWorkOp)) {
      expect(
        await åpneSteg('test-treff', steg.id, treff, erWorkOp, uventetLagring),
      ).toBe(treff);
    }
  }
});

test('avviser utilgjengelig førstegangsbesøk før API-kall', async () => {
  const uventetLagring = async () => {
    throw new Error('Utilgjengelig steg skal ikke lagres');
  };
  await expect(
    åpneSteg('test-treff', 4, lagTreffgjennomføring(), true, uventetLagring),
  ).rejects.toThrow('Steget er ikke tilgjengelig');
});
