import {
  beregnRotasjonsplan,
  flyttJobbsøkerTilRom,
  fordelJobbsøkerePåRom,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { normaliserRom } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringMockDomene.msw';
import type {
  ArbeidsgiverRotasjonDTO,
  RomDTO,
  TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import {
  formaterTreffgjennomføringInitialer,
  formaterTreffgjennomføringNavn,
  lagInitialvisning,
  lagNavnvisning,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import { expect, test } from '@playwright/test';

const lagRotasjon = (
  arbeidsgiverTreffId: string,
  førsteRomnummer: number,
): ArbeidsgiverRotasjonDTO => ({ arbeidsgiverTreffId, førsteRomnummer });

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
    expect(beregnRotasjonsplan([lagRotasjon('ag-1', 1)], 0, '09:00', 20)) //
      .toEqual([]);
    expect(beregnRotasjonsplan([], 3, '09:00', 20)).toEqual([]);
  });
});

test.describe('treffgjennomføringNavn', () => {
  test('formaterTreffgjennomføringNavn formaterer fullt navn og fallbacks', () => {
    expect(formaterTreffgjennomføringNavn('Ola', 'Nordmann')).toBe(
      'Ola Nordmann',
    );
    expect(formaterTreffgjennomføringNavn('Ola', null)).toBe('Ola');
    expect(formaterTreffgjennomføringNavn(null, 'Nordmann')).toBe('Nordmann');
    expect(formaterTreffgjennomføringNavn(null, null, 'Ukjent')).toBe('Ukjent');
  });

  test('formaterTreffgjennomføringInitialer henter store initialer for alle navnedeler', () => {
    expect(formaterTreffgjennomføringInitialer('Ola', 'Nordmann')).toBe('ON');
    expect(
      formaterTreffgjennomføringInitialer('Kari Anne', 'Hansen Olsen'),
    ).toBe('KAHO');
    expect(formaterTreffgjennomføringInitialer('Per-Arne', 'Olsen-Berg')).toBe(
      'PAOB',
    );
    expect(formaterTreffgjennomføringInitialer('ola', 'nordmann')).toBe('ON');
    expect(formaterTreffgjennomføringInitialer('Ola', null)).toBe('O');
    expect(formaterTreffgjennomføringInitialer(null, 'Nordmann')).toBe('N');
    expect(formaterTreffgjennomføringInitialer(null, null, 'Ukjent')).toBe(
      'Ukjent',
    );
  });

  test('lagInitialvisning inkluderer deltakernummer og store initialer', () => {
    const treffgjennomføring = {
      deltakernummer: [
        { personTreffId: 'p-1', deltakernummer: 1 },
        { personTreffId: 'p-2', deltakernummer: 2 },
      ],
    } as unknown as TreffgjennomføringDTO;

    const visInitialer = lagInitialvisning(treffgjennomføring);

    expect(
      visInitialer({
        personTreffId: 'p-1',
        fornavn: 'Ola',
        etternavn: 'Nordmann',
      }),
    ).toBe('1. ON');

    expect(
      visInitialer({
        personTreffId: 'p-2',
        fornavn: 'Kari Anne',
        etternavn: 'Hansen',
      }),
    ).toBe('2. KAH');

    // Uten deltakernummer
    expect(
      visInitialer({
        personTreffId: 'p-3',
        fornavn: 'Kari',
        etternavn: 'Nordmann',
      }),
    ).toBe('KN');
  });

  test('lagNavnvisning inkluderer deltakernummer og fullt navn', () => {
    const treffgjennomføring = {
      deltakernummer: [{ personTreffId: 'p-1', deltakernummer: 5 }],
    } as unknown as TreffgjennomføringDTO;

    const visNavn = lagNavnvisning(treffgjennomføring);

    expect(
      visNavn({
        personTreffId: 'p-1',
        fornavn: 'Ola',
        etternavn: 'Nordmann',
      }),
    ).toBe('5. Ola Nordmann');
  });
});
