'use client';

import FormidlingKandidater from './FormidlingKandidater';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import { Tabs } from '@navikt/ds-react';

// import OmStillingen from '@/app/stilling/[stillingsId]/omStillingen/OmStillingen'

export default function VisFormidling() {
  const { erEier } = useStillingsContext();

  return (
    <Tabs defaultValue='omStillingen'>
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
                  {erEier && <Tabs.Tab value='kandidater' label='Jobbsøkere' />}
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
}
