'use client';

import WindowVisStilling from '@/app/_windows/vis-stilling-window/WindowVisStilling';
import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import StillingsSøkeresultat from '@/app/stilling/StillingsSøkeresultat';
import StillingsSøkFilter from '@/app/stilling/_ui/StillingsSøkFilter';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

const EtterRegistreringSøk = () => {
  return (
    <React.Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={true}>
        <EtterRegistreringSøkLayout />
        <WindowVisStilling />
      </StillingsSøkProvider>
    </React.Suspense>
  );
};

const EtterRegistreringSøkLayout: React.FC = () => {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            title={'Etterregistreringer'}
            titleIcon={<BriefcaseClockIcon />}
            actionsRight={
              <Link href={'/stilling/ny/etterregistrering'}>
                <Button size='small'>Opprett etterregistrering</Button>
              </Link>
            }
          />
        </PanelHeader>
      }
    >
      <StillingsSøkFilter formidlinger={true} />
      <StillingsSøkeresultat />
    </SideLayout>
  );
};

export default EtterRegistreringSøk;
