'use client';

import FormidlingKandidater from './FormidlingKandidater';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import Stillingsbanner from '@/app/stilling/[stillingsId]/_ui/Stillingsbanner';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import StillingHandlinger from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/StillingHandlinger';
import Fanepanel from '@/components/layout/Fanepanel';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Tabs } from '@navikt/ds-react';

export default function VisFormidling() {
  const { erEier } = useStillingsContext();

  return (
    <Tabs defaultValue='omStillingen'>
      <SideLayout
        header={
          <PanelHeader>
            <PanelHeader.Section
              tabs={
                <>
                  <Stillingsbanner />
                  <Tabs.Tab value='omStillingen' label='Om stillingen' />
                  {erEier && <Tabs.Tab value='kandidater' label='Jobbsøkere' />}
                </>
              }
              actionsRight={<StillingHandlinger />}
            />
          </PanelHeader>
        }
      >
        <SideInnhold>
          <Fanepanel value='omStillingen'>
            <OmStillingen />
          </Fanepanel>
          {erEier && (
            <Fanepanel value='kandidater'>
              <FormidlingKandidater />
            </Fanepanel>
          )}
        </SideInnhold>
      </SideLayout>
    </Tabs>
  );
}
