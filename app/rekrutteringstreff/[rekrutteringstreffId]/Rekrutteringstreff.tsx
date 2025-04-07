'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import RekrutteringstreffArbeidsgivere from './components/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from './components/jobbsøkere/Jobbsøkere';
import OmTreffet from './components/om-treffet/OmTreffet';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { Box, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
}

const Rekrutteringstreff: React.FC = () => {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);

  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  return (
    <Box.New>
      <Tabs value={fane} onChange={(val) => setFane(val)}>
        <Tabs.List className='w-full'>
          <Tabs.Tab
            value={RekrutteringstreffTabs.OM_TREFFET}
            label='Om treffet'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.JOBBSØKERE}
            label={`Jobbsøkere(${jobbsøkere?.length ?? 0})`}
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.ARBEIDSGIVERE}
            label={`Arbeidsgivere(${arbeidsgivere?.length ?? 0})`}
          />
        </Tabs.List>

        <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET} className='my-4'>
          <OmTreffet />
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.JOBBSØKERE}>
          <Jobbsøkere />
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
          <RekrutteringstreffArbeidsgivere />
        </Tabs.Panel>
      </Tabs>
    </Box.New>
  );
};

export default Rekrutteringstreff;
