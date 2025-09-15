'use client';

import KandidatAktivitet from './aktivitet-fane/KandidatAktivitet';
import KandidatOversikt from './oversikt-fane/KandidatOversikt';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { FC, useEffect } from 'react';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

const KandidatSide: FC = () => {
  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  useEffect(() => {
    const contentElement = document.getElementById('høyreinnhold');

    if (contentElement) {
      contentElement.scrollTop = 0;
    }
  }, [fane]);

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)} className=' w-full'>
      <div className={'w-full @container/kandidattabs'}>
        <Tabs.List>
          <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
          <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
        </Tabs.List>
      </div>
      <Tabs.Panel value={Fane.OVERSIKT}>
        <div className='w-full'>
          <KandidatOversikt />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value={Fane.AKTIVITET}>
        <div className='w-full'>
          <KandidatAktivitet />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
};

export default KandidatSide;
