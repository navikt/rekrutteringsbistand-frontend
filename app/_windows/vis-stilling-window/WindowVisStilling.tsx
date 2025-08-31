import VisStillingKnapper from '@/app/_windows/vis-stilling-window/_ui/VisStillingKnapper';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingPrint';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useEffect, useRef } from 'react';

const WindowVisStilling: React.FC = ({}) => {
  const [visStillingId, setVisStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const printRef = useRef<HTMLDivElement>(null);
  const { addWindow } = useWindows();

  useEffect(() => {
    if (visStillingId) {
      addWindow({
        id: 'visStillingId',
        onClose: () => setVisStillingId(''),
        content: (
          <StillingsContextProvider stillingsId={visStillingId}>
            <SideLayout
              header={
                <PanelHeader>
                  <PanelHeader.Section
                    title={'Stillingsoppdrag'}
                    actionsRight={<StillingPrint printRef={printRef} />}
                  />
                </PanelHeader>
              }
            >
              <OmStillingenHeader />
              <VisStillingKnapper stillingsId={visStillingId} />
              <OmStillingen printRef={printRef} />
            </SideLayout>
          </StillingsContextProvider>
        ),
      });
    }
  }, [visStillingId, addWindow, setVisStillingId]);

  return null;
};

export default WindowVisStilling;
