import {
  flyttJobbsøkerTilRom,
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
