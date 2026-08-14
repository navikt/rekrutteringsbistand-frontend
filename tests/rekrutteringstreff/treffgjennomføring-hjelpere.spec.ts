import {
  beregnRotasjonsplan,
  flyttJobbsøkerTilRom,
  fordelJobbsøkerePåRom,
  normaliserRom,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import type {
  ArbeidsgiverRotasjonDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { expect, test } from '@playwright/test';

const lagRotasjon = (
  arbeidsgiverTreffId: string,
  startPosisjon: number,
): ArbeidsgiverRotasjonDTO => ({ arbeidsgiverTreffId, startPosisjon });

const lagRom = (romnummer: number, jobbsøkere: string[]): RomDTO => ({
  romnummer,
  jobbsøkere,
});

test.describe('treffgjennomføring-hjelpere', () => {
  test('fordeler round-robin når møteplanen opprettes', () => {
    expect(
      fordelJobbsøkerePåRom(
        ['person-1', 'person-2', 'person-3', 'person-4', 'person-5'],
        2,
      ),
    ).toEqual([
      lagRom(1, ['person-1', 'person-3', 'person-5']),
      lagRom(2, ['person-2', 'person-4']),
    ]);
  });

  test('flytter jobbsøkeren sist i målrommet', () => {
    const eksisterendeRom = [
      lagRom(1, ['person-1', 'person-2']),
      lagRom(2, ['person-3', 'person-4']),
      lagRom(3, []),
    ];

    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'person-1', 2)).toEqual([
      lagRom(1, ['person-2']),
      lagRom(2, ['person-3', 'person-4', 'person-1']),
      lagRom(3, []),
    ]);
  });

  test('lar romfordelingen stå når flyttingen ikke er gyldig', () => {
    const eksisterendeRom = [
      lagRom(1, ['person-1', 'person-2']),
      lagRom(2, ['person-3', 'person-4']),
    ];

    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'person-1', 1)).toBe(
      eksisterendeRom,
    );
    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'ukjent-person', 2)).toBe(
      eksisterendeRom,
    );
    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'person-1', 3)).toBe(
      eksisterendeRom,
    );
  });
});

test.describe('beregnRotasjonsplan', () => {
  test('fyller alle rom uten venting når det er like mange rom som arbeidsgivere', () => {
    const plan = beregnRotasjonsplan(
      [lagRotasjon('ag-1', 0), lagRotasjon('ag-2', 1), lagRotasjon('ag-3', 2)],
      3,
      '09:00',
      20,
    );

    expect(plan).toHaveLength(3);
    expect(
      plan.every((runde) => runde.ventendeArbeidsgivere.length === 0),
    ).toBe(true);

    expect(plan[0]).toMatchObject({
      runde: 1,
      startKlokkeslett: '09:00',
      sluttKlokkeslett: '09:20',
      rom: [
        { romnummer: 1, arbeidsgiverTreffId: 'ag-1' },
        { romnummer: 2, arbeidsgiverTreffId: 'ag-2' },
        { romnummer: 3, arbeidsgiverTreffId: 'ag-3' },
      ],
    });
    // Hver arbeidsgiver roterer ett rom videre per runde.
    expect(plan[1]).toMatchObject({
      runde: 2,
      startKlokkeslett: '09:20',
      sluttKlokkeslett: '09:40',
      rom: [
        { romnummer: 1, arbeidsgiverTreffId: 'ag-3' },
        { romnummer: 2, arbeidsgiverTreffId: 'ag-1' },
        { romnummer: 3, arbeidsgiverTreffId: 'ag-2' },
      ],
    });
    expect(plan[2]).toMatchObject({
      runde: 3,
      startKlokkeslett: '09:40',
      sluttKlokkeslett: '10:00',
      rom: [
        { romnummer: 1, arbeidsgiverTreffId: 'ag-2' },
        { romnummer: 2, arbeidsgiverTreffId: 'ag-3' },
        { romnummer: 3, arbeidsgiverTreffId: 'ag-1' },
      ],
    });
  });

  test('setter én arbeidsgiver på vent hver runde når det er færre rom enn arbeidsgivere', () => {
    const plan = beregnRotasjonsplan(
      [lagRotasjon('ag-1', 0), lagRotasjon('ag-2', 1), lagRotasjon('ag-3', 2)],
      2,
      '09:00',
      15,
    );

    expect(plan).toHaveLength(3);
    expect(
      plan.every(
        (runde) =>
          runde.rom.length === 2 && runde.ventendeArbeidsgivere.length === 1,
      ),
    ).toBe(true);
    expect(plan.map((runde) => runde.ventendeArbeidsgivere)).toEqual([
      ['ag-3'],
      ['ag-2'],
      ['ag-1'],
    ]);
    expect(plan[1].rom).toEqual([
      { romnummer: 1, arbeidsgiverTreffId: 'ag-3' },
      { romnummer: 2, arbeidsgiverTreffId: 'ag-1' },
    ]);
  });

  test('lar ett rom stå tomt hver runde når det er flere rom enn arbeidsgivere', () => {
    const plan = beregnRotasjonsplan(
      [lagRotasjon('ag-1', 0), lagRotasjon('ag-2', 1)],
      3,
      '09:00',
      20,
    );

    expect(plan).toHaveLength(3);
    expect(
      plan.every((runde) => runde.ventendeArbeidsgivere.length === 0),
    ).toBe(true);
    expect(
      plan.map(
        (runde) =>
          runde.rom.filter((rom) => rom.arbeidsgiverTreffId === null).length,
      ),
    ).toEqual([1, 1, 1]);
    expect(plan[0].rom).toEqual([
      { romnummer: 1, arbeidsgiverTreffId: 'ag-1' },
      { romnummer: 2, arbeidsgiverTreffId: 'ag-2' },
      { romnummer: 3, arbeidsgiverTreffId: null },
    ]);
  });

  test('fyller ut manglende rom slik at tomme rom blir sendt til backend', () => {
    expect(normaliserRom([lagRom(1, ['person-1'])], 3)).toEqual([
      lagRom(1, ['person-1']),
      lagRom(2, []),
      lagRom(3, []),
    ]);
  });

  test('flytter jobbsøkere fra rom som har falt bort til rommet med færrest', () => {
    expect(
      normaliserRom(
        [
          lagRom(1, ['person-1', 'person-2']),
          lagRom(2, ['person-3']),
          lagRom(3, ['person-4', 'person-5']),
        ],
        2,
      ),
    ).toEqual([
      lagRom(1, ['person-1', 'person-2', 'person-5']),
      lagRom(2, ['person-3', 'person-4']),
    ]);
  });

  test('gir tom liste når treffet ikke har rom', () => {
    expect(normaliserRom([lagRom(1, ['person-1'])], 0)).toEqual([]);
  });

  test('gir tom plan når det ikke er rom eller arbeidsgivere', () => {
    expect(beregnRotasjonsplan([lagRotasjon('ag-1', 0)], 0, '09:00', 20)) //
      .toEqual([]);
    expect(beregnRotasjonsplan([], 3, '09:00', 20)).toEqual([]);
  });
});
