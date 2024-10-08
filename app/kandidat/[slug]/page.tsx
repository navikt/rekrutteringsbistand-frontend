'use client';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import KandidatAktivitet from './KandidatAktivitet';
import KandidatForslagTilStilling from './KandidatForslagTilStilling';
import KandidatOversikt from './KandidatOversikt';

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
    <Tabs defaultValue={fane} onChange={(val) => setFane(val)}>
      <Tabs.List>
        <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
        <Tabs.Tab value={Fane.AKTIVITET} label='Aktivitet' />
        <Tabs.Tab value={Fane.FORSLAG} label='Forslag til stilling' />
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
