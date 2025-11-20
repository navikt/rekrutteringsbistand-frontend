'use client';

import Statistikk from './_ui/Statistikk';
import UlesteNyheterModal from './_ui/UlesteNyheterModal';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';

export default function Forside() {
  return (
    <>
      <UlesteNyheterModal />
      <SideLayout
        header={
          <PanelHeader>
            <PanelHeader.Section skjulBrødsmuler title={'Oversikt'} />
          </PanelHeader>
        }
      >
        <SideInnhold>
          <Statistikk />
        </SideInnhold>
      </SideLayout>
    </>
  );
}
