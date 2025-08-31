'use client';

import FormidlingKandidater from './FormidlingKandidater';
import WindowVisKandidat from '@/app/_windows/vis-kandidat-window/WindowVisKandidat';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';

// import OmStillingen from '@/app/stilling/[stillingsId]/omStillingen/OmStillingen'

const VisFormidling: React.FC = () => {
  const { erEier } = useStillingsContext();

  return (
    <Tabs defaultValue='omStillingen'>
      <WindowVisKandidat />
      <SideLayout
        header={
          <PanelHeader>
            <PanelHeader.Section
              back={{
                fallbackPath: '/etterregistrering',
              }}
              title={'Etterregistrering'}
              titleIcon={<BriefcaseClockIcon />}
              tabs={
                <>
                  <Tabs.Tab value='omStillingen' label='Om stillingen' />
                  {erEier && <Tabs.Tab value='kandidater' label='Kandidater' />}
                </>
              }
            />
          </PanelHeader>
        }
      >
        <Tabs.Panel value='omStillingen'>
          <OmStillingen printRef={null} />
        </Tabs.Panel>
        {erEier && (
          <Tabs.Panel value='kandidater'>
            <FormidlingKandidater />
          </Tabs.Panel>
        )}
      </SideLayout>
    </Tabs>
  );
};

export default VisFormidling;
