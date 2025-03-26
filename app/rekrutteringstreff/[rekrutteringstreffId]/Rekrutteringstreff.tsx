'use client';

import RekrutteringstreffArbeidsgivere from './components/arbeidsgivere/Arbeidsgivere';
import Deltakere from './components/deltakere/Deltakere';
import OmTreffet from './components/om-treffet/OmTreffet';
import { Box, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  DELTAKERE = 'deltakere',
  ARBEIDSGIVERE = 'arbeidsgivere',
}

const Rekrutteringstreff: React.FC = () => {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });

  return (
    <Box.New>
      <Tabs value={fane} onChange={(val) => setFane(val)}>
        <Tabs.List className='w-full'>
          <Tabs.Tab
            value={RekrutteringstreffTabs.OM_TREFFET}
            label='Om treffet'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.DELTAKERE}
            label='Deltakere'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.ARBEIDSGIVERE}
            label='Arbeidsgivere'
          />
        </Tabs.List>

        <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET} className='my-4'>
          <OmTreffet />
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.DELTAKERE}>
          <Deltakere />
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
          <RekrutteringstreffArbeidsgivere />
        </Tabs.Panel>
      </Tabs>
    </Box.New>
  );
};

export default Rekrutteringstreff;
