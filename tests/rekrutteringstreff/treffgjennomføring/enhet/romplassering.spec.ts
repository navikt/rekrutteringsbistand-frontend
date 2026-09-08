import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { flyttJobbsøkerTilRom } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/romplassering';
import { expect, test } from '@playwright/test';

const lagRom = (romnummer: number, jobbsøkere: string[]): RomDTO => ({
  romnummer,
  jobbsøkere,
});

test.describe('romplassering', () => {
  test('flytter jobbsøkeren og sorterer etter deltakernummer i målrommet', () => {
    const eksisterendeRom = [
      lagRom(1, ['person-1', 'person-2']),
      lagRom(2, ['person-3', 'person-4']),
      lagRom(3, []),
    ];
    const deltakernummer: Record<string, number> = {
      'person-1': 1,
      'person-2': 2,
      'person-3': 3,
      'person-4': 4,
    };

    expect(
      flyttJobbsøkerTilRom(
        eksisterendeRom,
        'person-1',
        2,
        (id) => deltakernummer[id],
      ),
    ).toEqual([
      lagRom(1, ['person-2']),
      lagRom(2, ['person-1', 'person-3', 'person-4']),
      lagRom(3, []),
    ]);
  });

  test('lar romfordelingen stå når flyttingen ikke er gyldig', () => {
    const eksisterendeRom = [
      lagRom(1, ['person-1', 'person-2']),
      lagRom(2, ['person-3', 'person-4']),
    ];

    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'person-1', 1)).toEqual(
      eksisterendeRom,
    );
    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'ukjent-person', 2)).toEqual(
      eksisterendeRom,
    );
    expect(flyttJobbsøkerTilRom(eksisterendeRom, 'person-1', 3)).toEqual(
      eksisterendeRom,
    );
  });
});
