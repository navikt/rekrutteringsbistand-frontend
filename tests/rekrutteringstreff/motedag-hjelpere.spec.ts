import {
  balanserJobbsøkerePåRom,
  fordelJobbsøkerePåRom,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { expect, test } from '@playwright/test';

const lagRom = (romnummer: number, jobbsøkere: string[]): RomDTO => ({
  romnummer,
  jobbsøkere,
});

test.describe('møtedag-hjelpere', () => {
  test('fordeler round-robin når møteplanen opprettes', () => {
    expect(
      balanserJobbsøkerePåRom(
        [],
        ['person-1', 'person-2', 'person-3', 'person-4', 'person-5'],
        2,
      ),
    ).toEqual(
      fordelJobbsøkerePåRom(
        ['person-1', 'person-2', 'person-3', 'person-4', 'person-5'],
        2,
      ),
    );
  });

  test('flytter færrest mulig når eksisterende rom balanseres', () => {
    const eksisterendeRom = [
      lagRom(1, ['person-1', 'person-2', 'person-3']),
      lagRom(2, ['person-4', 'person-5', 'person-6', 'person-7', 'person-8']),
      lagRom(3, [
        'person-9',
        'person-10',
        'person-11',
        'person-12',
        'person-13',
      ]),
      lagRom(4, [
        'person-14',
        'person-15',
        'person-16',
        'person-17',
        'person-18',
      ]),
    ];
    const oppmøte = eksisterendeRom.flatMap(({ jobbsøkere }) => jobbsøkere);

    expect(balanserJobbsøkerePåRom(eksisterendeRom, oppmøte, 4)).toEqual([
      lagRom(1, ['person-1', 'person-2', 'person-3', 'person-18']),
      eksisterendeRom[1],
      eksisterendeRom[2],
      lagRom(4, ['person-14', 'person-15', 'person-16', 'person-17']),
    ]);
  });

  test('beholder flest mulig når antall rom endres', () => {
    const eksisterendeRom = [
      lagRom(1, ['person-1', 'person-2']),
      lagRom(2, ['person-3', 'person-4']),
    ];

    expect(
      balanserJobbsøkerePåRom(
        eksisterendeRom,
        ['person-1', 'person-2', 'person-3', 'person-4'],
        3,
      ),
    ).toEqual([
      eksisterendeRom[0],
      lagRom(2, ['person-3']),
      lagRom(3, ['person-4']),
    ]);
  });
});
