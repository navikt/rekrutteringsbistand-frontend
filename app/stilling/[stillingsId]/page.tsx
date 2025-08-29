'use client';

import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import StillingTabs from '@/app/stilling/[stillingsId]/_ui/tabs/StillingTabs';
import TabKnapper from '@/app/stilling/[stillingsId]/_ui/tabs/TabKnapper';
import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { useRef } from 'react';

enum StillingFane {
  STILLING = 'stilling',
  KANDIDATER = 'kandidater',
}

export default function StillingsSidePage() {
  const [fane, setFane] = useQueryState('stillingFane', {
    defaultValue: StillingFane.STILLING,
    clearOnDefault: true,
  });
  const { erEier, kandidatlisteInfo, stillingsData } = useStillingsContext();

  const printRef = useRef<HTMLDivElement>(null);
  return (
    <SideLayout>
      <Tabs defaultValue={fane} onChange={(val: any) => setFane(val)}>
        <PanelHeader>
          <PanelHeader.Section
            title={stillingsData.stilling.title ?? ''}
            back={{
              fallbackPath: '/stilling',
            }}
            tabs={<StillingTabs />}
            actionsRight={<TabKnapper printRef={printRef} />}
          />
        </PanelHeader>

        <Tabs.Panel value={StillingFane.STILLING}>
          <OmStillingen printRef={printRef} />
        </Tabs.Panel>
        {kandidatlisteInfo?.kandidatlisteId && erEier && (
          <>
            <Tabs.Panel value={StillingFane.KANDIDATER}>
              <KandidatlisteWrapper>
                <FiltrertKandidatListeVisning />
              </KandidatlisteWrapper>
            </Tabs.Panel>
          </>
        )}
      </Tabs>
    </SideLayout>
  );
}
