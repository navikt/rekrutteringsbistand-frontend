'use client';

import KiLogg from '../_ui/kilogg/components/KiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SideScroll from '@/components/SideScroll';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Heading } from '@navikt/ds-react';

export default function KiLoggPage() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
    >
      <SideLayout
        header={
          <div className='sticky top-0 z-40 bg-[var(--ax-bg-default)]'>
            <PanelHeader className='bg-transparent'>
              <PanelHeader.Section
                erstattPath={[rekrutteringstreffId, 'KI Logg']}
              />
            </PanelHeader>
          </div>
        }
      >
        <SideScroll>
          <div className='space-y-4 p-4'>
            <Heading level='1' size='large'>
              KI Logg
            </Heading>
            <KiLogg />
          </div>
        </SideScroll>
      </SideLayout>
    </TilgangskontrollForInnhold>
  );
}
