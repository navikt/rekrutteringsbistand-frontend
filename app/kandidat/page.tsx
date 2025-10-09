'use client';

import KandidatSokLayout from './KandidatSokLayout';
import KandidatSøkTabs from './KandidatSøkTabs';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';

export default function KandidatPage() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section />
        </PanelHeader>
      }
    >
      <KandidatSokLayout>
        <KandidatSøkTabs />
      </KandidatSokLayout>
    </SideLayout>
  );
}
