import RekBisKort from '@/components/layout/RekBisKort';
import { SideLayoutProvider } from '@/components/layout/SideLayoutContext';
import Sidepanel, {
  SidepanelBreddeProp,
} from '@/components/sidepanel/Sidepanel';
import * as React from 'react';

export type ISideLayout = {
  header?: React.ReactNode;
  sidepanelTittel?: string;

  children: React.ReactNode;
  maksBredde?: boolean;
  sidepanel?: React.ReactNode;
  sidepanelBredde?: SidepanelBreddeProp;
  /** @deprecated Bruk NewProps */
  topBanner?: React.ReactNode | undefined;
  /** @deprecated Bruk NewProps */
  navigasjon?: React.ReactNode;
  /** @deprecated Bruk NewProps */
  banner?: React.ReactNode;
  venstrePanel?: boolean;
};

const borderCls = 'border-b border-b-[var(--ax-border-neutral-subtle)]';
const breddeBegrensning = ' mx-auto w-full h-full';
const SideLayout = ({
  children,
  header,
  maksBredde = false,
  sidepanel,
  sidepanelBredde,
  sidepanelTittel,
  venstrePanel,
}: ISideLayout) => {
  return (
    <SideLayoutProvider hasSidepanel={!!sidepanel}>
      <div className={`@container/sidelayout contain-layout`}>
        <RekBisKort>
          {header && (
            <div className={`${borderCls} w-full`}>
              <div className={`${maksBredde ? '' : breddeBegrensning}`}>
                {header}
              </div>
            </div>
          )}

          <div className={`${maksBredde ? '' : breddeBegrensning} flex`}>
            {venstrePanel && sidepanel && (
              <Sidepanel
                venstrePanel
                sidepanelBredde={sidepanelBredde}
                sidepanelTittel={sidepanelTittel}
              >
                {sidepanel}
              </Sidepanel>
            )}
            <div className={sidepanel ? 'min-w-0 flex-1' : 'w-full'}>
              {children}
            </div>
            {!venstrePanel && sidepanel && (
              <Sidepanel
                sidepanelBredde={sidepanelBredde}
                sidepanelTittel={sidepanelTittel}
              >
                {sidepanel}
              </Sidepanel>
            )}
          </div>
        </RekBisKort>
      </div>
    </SideLayoutProvider>
  );
};

export default SideLayout;
