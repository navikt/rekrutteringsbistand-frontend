'use client';

import Arbeidsgivere from './components/arbeidsgivere/Arbeidsgivere';
import Deltakere from './components/deltakere/Deltakere';
import OmTreffet from './components/om-treffet/OmTreffet';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { Box, Tabs } from '@navikt/ds-react';
import * as React from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  DELTAKERE = 'deltakere',
  ARBEIDSGIVERE = 'arbeidsgivere',
}

const Rekrutteringstreff: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(
    RekrutteringstreffTabs.OM_TREFFET,
  );
  const [arbeidsgivere, setArbeidsgivere] = React.useState<ArbeidsgiverDTO[]>(
    [],
  );

  const handleLeggTilArbeidsgiver = (arbeidsgiver: ArbeidsgiverDTO | null) => {
    setArbeidsgivere((prev) => (arbeidsgiver ? [...prev, arbeidsgiver] : prev));
    setActiveTab(RekrutteringstreffTabs.ARBEIDSGIVERE);
  };

  return (
    <Box.New>
      <Tabs
        value={activeTab}
        onChange={(value) => setActiveTab(value as RekrutteringstreffTabs)}
      >
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
          <OmTreffet handleLeggTilArbeidsgiver={handleLeggTilArbeidsgiver} />
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.DELTAKERE}>
          <Deltakere />
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
          <Arbeidsgivere
            handleLeggTilArbeidsgiver={handleLeggTilArbeidsgiver}
            arbeidsgivere={arbeidsgivere}
          />
        </Tabs.Panel>
      </Tabs>
    </Box.New>
  );
};

export default Rekrutteringstreff;
