'use client';

import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { Roller } from '@/components/tilgangskontroll/roller';
import Welcome from '@/dokumentasjon/index.mdx';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export default function Page() {
  const { harRolle } = useApplikasjonContext();

  if (harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])) {
    return <div> Du er utvikler </div>;
  }
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section />
        </PanelHeader>
      }
    >
      <Welcome />
    </SideLayout>
  );
}
