'use client';

import StillingsSøk from './StillingsSøk';
import WindowVisStilling from '@/app/_windows/vis-stilling-window/WindowVisStilling';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { OpprettKnapp } from '@/components/felles/opprett/OpprettKnapp';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { BriefcaseIcon } from '@navikt/aksel-icons';

export default function StillingsSøkIndex() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            title={'Stillingsoppdrag'}
            titleIcon={<BriefcaseIcon />}
            actionsRight={
              <OpprettKnapp kategori={Stillingskategori.Stilling} />
            }
          />
        </PanelHeader>
      }
    >
      <StillingsSøk />
      <WindowVisStilling />
    </SideLayout>
  );
}
