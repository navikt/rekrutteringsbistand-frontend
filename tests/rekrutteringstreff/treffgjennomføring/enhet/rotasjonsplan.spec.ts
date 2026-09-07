import type { ArbeidsgiverRotasjonDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { beregnRotasjonsplan } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/rotasjonsplan';
import { expect, test } from '@playwright/test';

const lagRotasjon = (
  arbeidsgiverTreffId: string,
  førsteRomnummer: number,
): ArbeidsgiverRotasjonDTO => ({ arbeidsgiverTreffId, førsteRomnummer });

test.describe('beregnRotasjonsplan', () => {
  test('fyller alle rom uten venting når det er like mange rom som arbeidsgivere', () => {
    const plan = beregnRotasjonsplan(
      [lagRotasjon('ag-1', 1), lagRotasjon('ag-2', 2), lagRotasjon('ag-3', 3)],
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
      [lagRotasjon('ag-1', 1), lagRotasjon('ag-2', 2), lagRotasjon('ag-3', 3)],
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
      [lagRotasjon('ag-1', 1), lagRotasjon('ag-2', 2)],
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

  test('gir tom plan når det ikke er rom eller arbeidsgivere', () => {
    expect(
      beregnRotasjonsplan([lagRotasjon('ag-1', 1)], 0, '09:00', 20),
    ).toEqual([]);
    expect(beregnRotasjonsplan([], 3, '09:00', 20)).toEqual([]);
  });
});
