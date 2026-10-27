'use client';

import UlesteNyheterModal from './_ui/UlesteNyheterModal';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Alert } from '@navikt/ds-react';

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
          <Alert variant='info'>
            Statistikken er midlertidig utilgjengelig
          </Alert>
        </SideInnhold>
      </SideLayout>
    </>
  );
}
