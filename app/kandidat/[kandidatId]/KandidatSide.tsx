'use client';

import NavigerTilAktivitetsplanenKnapp from '../../components/NavigerTilAktivitetsplanenKnapp';
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

export interface KandidatSideProps {
  sidebar?: boolean;
}

const KandidatSide: React.FC<KandidatSideProps> = ({ sidebar }) => {
  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)} className='w-full'>
      <div className={sidebar ? 'w-full' : ''}>
        <Tabs.List className='flex w-full justify-between'>
          <div className='flex whitespace-nowrap'>
            <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
            <Tabs.Tab value={Fane.AKTIVITET} label='Aktivitet' />
          </div>

          <div
            className={
              sidebar
                ? 'flex items-center gap-2'
                : 'flex items-center gap-4 ml-auto'
            }
          >
            <FinnStillingForKandidatKnapp sidebar={sidebar} />
            <NavigerTilAktivitetsplanenKnapp sidebar={sidebar} />
          </div>
        </Tabs.List>
      </div>
      <Tabs.Panel value={Fane.OVERSIKT}>
        <KandidatOversikt sidebar={sidebar} />
      </Tabs.Panel>
      <Tabs.Panel value={Fane.AKTIVITET}>
        <KandidatAktivitet />
      </Tabs.Panel>
    </Tabs>
  );
};

export default KandidatSide;
