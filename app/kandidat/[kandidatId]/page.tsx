'use client';

import KandidatAktivitet from './aktivitet-fane/KandidatAktivitet';
import KandidatForslagTilStilling from './forslag-fane/KandidatForslagTilStilling';
import KandidatOversikt from './oversikt-fane/KandidatOversikt';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
  FORSLAG = 'forslagTilStilling',
}

export default function KandidatIndex() {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)}>
      <Tabs.List>
        <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
        <Tabs.Tab value={Fane.AKTIVITET} label='Aktivitet' disabled />
        <Tabs.Tab value={Fane.FORSLAG} label='Forslag til stilling' disabled />
      </Tabs.List>
      <Tabs.Panel value={Fane.OVERSIKT}>
        <KandidatOversikt />
      </Tabs.Panel>
      <Tabs.Panel value={Fane.AKTIVITET}>
        <KandidatAktivitet />
      </Tabs.Panel>
      <Tabs.Panel value={Fane.FORSLAG}>
        <KandidatForslagTilStilling />
      </Tabs.Panel>
    </Tabs>
  );
}
