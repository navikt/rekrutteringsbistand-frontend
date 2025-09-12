'use client';

import Statistikk from './_ui/Statistikk';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';

export default function Forside() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section title={'Oversikt'} />
        </PanelHeader>
      }
    >
      <div className='mt-5'>
        <Statistikk />
      </div>
    </SideLayout>
  );
}
