'use client';

import StillingsSøk from './StillingsSøk';
import WindowVisStilling from '@/app/_windows/vis-stilling-window/WindowVisStilling';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';

export default function StillingsSøkIndex() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            title={'Stillingsoppdrag'}
            titleIcon={<BriefcaseIcon />}
            actionsRight={
              <Link href={'/stilling/ny'}>
                <Button size='small'>Opprett annonse</Button>
              </Link>
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
