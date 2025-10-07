'use client';

import StillingsSøk from '@/app/stilling/StillingsSøk';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';

export interface FinnStillingForKandidatProps {
  kandidatNr: string;
}

export default function FinnStillingForKandidat({
  kandidatNr,
}: FinnStillingForKandidatProps) {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section title={'Finn stilling for jobbsøker'} />
        </PanelHeader>
      }
    >
      <StillingsSøk key={`stilling-${kandidatNr}`} forKandidatNr={kandidatNr} />
    </SideLayout>
  );
}
