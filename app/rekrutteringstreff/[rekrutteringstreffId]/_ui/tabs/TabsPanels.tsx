'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import Arbeidsgivere from '../arbeidsgiver/Arbeidsgivere';
import Hendelser from '../hendelser/Hendelser';
import Jobbsøkere from '../jobbsøker/Jobbsøkere';
import OmTreffetForEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForEier';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

const TabsPanels: FC = () => {
  return (
    <>
      <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET}>
        <OmTreffetForEier />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.JOBBSØKERE}>
        <Jobbsøkere />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
        <Arbeidsgivere />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.HENDELSER}>
        <Hendelser />
      </Tabs.Panel>
    </>
  );
};

export default TabsPanels;
