'use client';

import NavigerTilAktivitetsplanenKnapp from '../../components/NavigerTilAktivitetsplanenKnapp';
import KandidatAktivitet from './aktivitet-fane/KandidatAktivitet';
import FinnStillingForKandidatKnapp from './components/FinnStillingForKandidatKnapp';
import KandidatOversikt from './oversikt-fane/KandidatOversikt';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

export default function KandidatIndex() {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)}>
      <Tabs.List className='flex w-full justify-between'>
        <div>
          <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
          <Tabs.Tab value={Fane.AKTIVITET} label='Aktivitet' />
        </div>
        <div>
          <FinnStillingForKandidatKnapp />
          <NavigerTilAktivitetsplanenKnapp />
        </div>
      </Tabs.List>
      <Tabs.Panel value={Fane.OVERSIKT}>
        <KandidatOversikt />
      </Tabs.Panel>
      <Tabs.Panel value={Fane.AKTIVITET}>
        <KandidatAktivitet />
      </Tabs.Panel>
    </Tabs>
  );
}
