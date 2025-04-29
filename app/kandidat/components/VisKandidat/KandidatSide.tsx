'use client';

import NavigerTilAktivitetsplanenKnapp from '../../../components/NavigerTilAktivitetsplanenKnapp';
import KandidatAktivitet from './aktivitet-fane/KandidatAktivitet';
import FinnStillingForKandidatKnapp from './components/FinnStillingForKandidatKnapp';
import KandidatOversikt from './oversikt-fane/KandidatOversikt';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

const KandidatSide: React.FC = () => {
  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)} className='w-full'>
      <div className={'w-full'}>
        <Tabs.List className='flex w-full justify-between'>
          <div className='flex whitespace-nowrap'>
            <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
            <Tabs.Tab value={Fane.AKTIVITET} label='Aktivitet' />
          </div>

          <div className={'flex items-center gap-2'}>
            <FinnStillingForKandidatKnapp />
            <NavigerTilAktivitetsplanenKnapp />
          </div>
        </Tabs.List>
      </div>
      <Tabs.Panel value={Fane.OVERSIKT}>
        <KandidatOversikt />
      </Tabs.Panel>
      <Tabs.Panel value={Fane.AKTIVITET}>
        <KandidatAktivitet />
      </Tabs.Panel>
    </Tabs>
  );
};

export default KandidatSide;
