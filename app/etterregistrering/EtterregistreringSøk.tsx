'use client';

import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import StillingsSøkeresultat from '@/app/stilling/StillingsSøkeresultat';
import StillingsSøkFilter from '@/app/stilling/_ui/StillingsSøkFilter';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import MittStandardsøk from '@/app/stilling/_ui/standardsøk/MittStandardsøk';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { OpprettKnapp } from '@/components/felles/opprett/OpprettKnapp';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import { FC, Suspense } from 'react';

const EtterRegistreringSøk = () => {
  return (
    <Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={true}>
        <EtterRegistreringSøkLayout />
      </StillingsSøkProvider>
    </Suspense>
  );
};

const EtterRegistreringSøkLayout: FC = () => {
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
      <div className='@container flex'>
        <div className='flex-grow min-w-0'>
          <StillingsSøkeresultat />
        </div>
        <div className='hidden @[720px]:flex @[720px]:flex-col ml-4 pt-4  max-w-[200px] gap-4'>
          <MittStandardsøk />
          <StillingsSøkSortering />

          {/* <StatusFilter /> */}

          <GeografiFilter />

          <InkluderingFilter />
        </div>
      </div>
    </SideLayout>
  );
};

export default EtterRegistreringSøk;
