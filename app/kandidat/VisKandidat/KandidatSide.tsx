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

const KandidatSide: React.FC = () => {
  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  React.useEffect(() => {
    const contentElement = document.getElementById('høyreinnhold');

    if (contentElement) {
      contentElement.scrollTop = 0;
    }
  }, [fane]);

  const Knapper = (
    <div className={'flex items-center gap-2'}>
      <FinnStillingForKandidatKnapp />
      <NavigerTilAktivitetsplanenKnapp />
    </div>
  );
  return (
    <Tabs value={fane} onChange={(val) => setFane(val)} className=' w-full'>
      <div className={'w-full @container/kandidattabs'}>
        <div className={' @xl/kandidattabs:hidden'}>{Knapper}</div>
        <Tabs.List className='flex w-full justify-between'>
          <div className='flex whitespace-nowrap'>
            <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
            <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
          </div>
          <div className='hidden @xl/kandidattabs:block'>{Knapper}</div>
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
