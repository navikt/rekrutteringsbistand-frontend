'use client';

import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import StillingsSøkeresultat from '@/app/stilling/StillingsSøkeresultat';
import StillingsSøkFilter from '@/app/stilling/_ui/StillingsSøkFilter';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { OpprettKnapp } from '@/components/felles/opprett/OpprettKnapp';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import * as React from 'react';

const EtterRegistreringSøk = () => {
  return (
    <React.Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={true}>
        <EtterRegistreringSøkLayout />
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
              <OpprettKnapp kategori={Stillingskategori.Formidling} />
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
