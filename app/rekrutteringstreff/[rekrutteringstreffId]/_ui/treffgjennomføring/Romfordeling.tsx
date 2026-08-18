'use client';

import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import Romkort, {
  type Romhandlinger,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Romkort';
import { HGrid, HStack } from '@navikt/ds-react';
import type { FC } from 'react';

interface Props {
  rom: RomDTO[];
  navnPåJobbsøker: (personTreffId: string) => string;
  idPrefiks: string;
  /** Utelates for en skrivebeskyttet visning. */
  romhandlinger?: Romhandlinger;
  utskrift?: boolean;
}

/** Alle rommene med jobbsøkerne som er plassert i dem. */
const Romfordeling: FC<Props> = ({
  rom,
  navnPåJobbsøker,
  idPrefiks,
  romhandlinger,
  utskrift = false,
}) => {
  const romkort = rom.map((romdata) => (
    <Romkort
      key={romdata.romnummer}
      romdata={romdata}
      andreRomnumre={rom
        .map(({ romnummer }) => romnummer)
        .filter((romnummer) => romnummer !== romdata.romnummer)}
      navnPåJobbsøker={navnPåJobbsøker}
      idPrefiks={idPrefiks}
      romhandlinger={romhandlinger}
      utskrift={utskrift}
    />
  ));

  return utskrift ? (
    <HStack gap='space-16' align='stretch' wrap>
      {romkort}
    </HStack>
  ) : (
    <HGrid
      gap='space-4'
      columns={{
        xs: 1,
        md: Math.max(1, Math.min(rom.length, 2)),
        xl: Math.max(1, Math.min(rom.length, 5)),
      }}
    >
      {romkort}
    </HGrid>
  );
};

export default Romfordeling;
