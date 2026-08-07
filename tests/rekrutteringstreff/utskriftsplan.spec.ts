import type { RotasjonsRunde } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import {
  lagArbeidsgiverplaner,
  lagRomplaner,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/utskriftsplan';
import { expect, test } from '@playwright/test';

// Rommene oppgis som tupler, ikke som et objekt. Objektnøkler som er heltall
// sorteres nemlig stigende av JavaScript, og da kunne ikke testen for
// sorteringen gitt rommene i uordnet rekkefølge.
const lagRunde = (
  runde: number,
  startKlokkeslett: string,
  sluttKlokkeslett: string,
  rom: [romnummer: number, arbeidsgiverTreffId: string | null][],
  ventendeArbeidsgivere: string[] = [],
): RotasjonsRunde => ({
  runde,
  startKlokkeslett,
  sluttKlokkeslett,
  rom: rom.map(([romnummer, arbeidsgiverTreffId]) => ({
    romnummer,
    arbeidsgiverTreffId,
  })),
  ventendeArbeidsgivere,
});

// To arbeidsgivere som roterer mellom to rom: A starter i rom 1, B i rom 2.
const toRunderMedToRom: RotasjonsRunde[] = [
  lagRunde(1, '09:00', '09:05', [
    [1, 'ag-a'],
    [2, 'ag-b'],
  ]),
  lagRunde(2, '09:10', '09:15', [
    [1, 'ag-b'],
    [2, 'ag-a'],
  ]),
];

test.describe('utskriftsplan', () => {
  test('gir hver arbeidsgiver sin egen tidsplan med rom', () => {
    expect(lagArbeidsgiverplaner(toRunderMedToRom, ['ag-a', 'ag-b'])).toEqual([
      {
        arbeidsgiverTreffId: 'ag-a',
        poster: [
          {
            startKlokkeslett: '09:00',
            sluttKlokkeslett: '09:05',
            romnummer: 1,
          },
          {
            startKlokkeslett: '09:10',
            sluttKlokkeslett: '09:15',
            romnummer: 2,
          },
        ],
      },
      {
        arbeidsgiverTreffId: 'ag-b',
        poster: [
          {
            startKlokkeslett: '09:00',
            sluttKlokkeslett: '09:05',
            romnummer: 2,
          },
          {
            startKlokkeslett: '09:10',
            sluttKlokkeslett: '09:15',
            romnummer: 1,
          },
        ],
      },
    ]);
  });

  test('følger rekkefølgen den får arbeidsgiverne i', () => {
    expect(
      lagArbeidsgiverplaner(toRunderMedToRom, ['ag-b', 'ag-a']).map(
        ({ arbeidsgiverTreffId }) => arbeidsgiverTreffId,
      ),
    ).toEqual(['ag-b', 'ag-a']);
  });

  test('markerer runden som venting når arbeidsgiveren ikke har rom', () => {
    const medVenting = [
      lagRunde(1, '09:00', '09:05', [[1, 'ag-a']], ['ag-b']),
      lagRunde(2, '09:10', '09:15', [[1, 'ag-b']], ['ag-a']),
    ];

    expect(
      lagArbeidsgiverplaner(medVenting, ['ag-a'])[0].poster.map(
        ({ romnummer }) => romnummer,
      ),
    ).toEqual([1, null]);
  });

  test('gir en tom plan for en arbeidsgiver som ikke er i rotasjonen', () => {
    expect(lagArbeidsgiverplaner([], ['ag-a'])).toEqual([
      { arbeidsgiverTreffId: 'ag-a', poster: [] },
    ]);
  });

  test('gir hvert rom sin egen tidsplan med arbeidsgivere', () => {
    expect(lagRomplaner(toRunderMedToRom)).toEqual([
      {
        romnummer: 1,
        poster: [
          {
            startKlokkeslett: '09:00',
            sluttKlokkeslett: '09:05',
            arbeidsgiverTreffId: 'ag-a',
          },
          {
            startKlokkeslett: '09:10',
            sluttKlokkeslett: '09:15',
            arbeidsgiverTreffId: 'ag-b',
          },
        ],
      },
      {
        romnummer: 2,
        poster: [
          {
            startKlokkeslett: '09:00',
            sluttKlokkeslett: '09:05',
            arbeidsgiverTreffId: 'ag-b',
          },
          {
            startKlokkeslett: '09:10',
            sluttKlokkeslett: '09:15',
            arbeidsgiverTreffId: 'ag-a',
          },
        ],
      },
    ]);
  });

  test('sorterer rommene stigende uansett rekkefølge i rotasjonsplanen', () => {
    const usortert = [
      lagRunde(1, '09:00', '09:05', [
        [3, 'ag-c'],
        [1, 'ag-a'],
      ]),
    ];

    expect(lagRomplaner(usortert).map(({ romnummer }) => romnummer)).toEqual([
      1, 3,
    ]);
  });

  test('tar med rom som står tomme i enkelte runder', () => {
    const medTomtRom = [
      lagRunde(1, '09:00', '09:05', [
        [1, 'ag-a'],
        [2, null],
      ]),
      lagRunde(2, '09:10', '09:15', [
        [1, null],
        [2, 'ag-a'],
      ]),
    ];

    expect(
      lagRomplaner(medTomtRom)[1].poster.map(
        ({ arbeidsgiverTreffId }) => arbeidsgiverTreffId,
      ),
    ).toEqual([null, 'ag-a']);
  });

  test('gir ingen romplaner uten rotasjonsplan', () => {
    expect(lagRomplaner([])).toEqual([]);
  });
});
