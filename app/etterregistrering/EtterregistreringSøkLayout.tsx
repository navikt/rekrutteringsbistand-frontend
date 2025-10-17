'use client';

import StillingsSøkeresultat from '@/app/stilling/StillingsSøkeresultat';
import StillingsSøkFilter from '@/app/stilling/_ui/StillingsSøkFilter';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import StatusFilter from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';
import StillingSøkebar from '@/app/stilling/_ui/StillingsSøkFilter/StillingSøkebar';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import MittStandardsøk from '@/app/stilling/_ui/standardsøk/MittStandardsøk';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { OpprettKnapp } from '@/components/opprett/OpprettKnapp';

export default function EtterregistreringSøkLayout() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            actionsRight={
              <OpprettKnapp kategori={Stillingskategori.Formidling} />
            }
          />
        </PanelHeader>
      }
      sidepanelBredde='250px'
      sidepanel={
        <div className='flex flex-col  gap-4'>
          <StillingSøkebar alltidÅpen={false} />
          <MittStandardsøk />
          <StillingsSøkSortering />
          <StatusFilter />
          <GeografiFilter />
          <InkluderingFilter />
        </div>
      }
    >
      <SideInnhold utenScroll>
        <StillingsSøkFilter formidlinger={true} />
        <StillingsSøkeresultat />
      </SideInnhold>
    </SideLayout>
  );
}
