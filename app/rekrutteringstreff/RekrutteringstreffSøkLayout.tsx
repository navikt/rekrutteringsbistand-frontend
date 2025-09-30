'use client';

import { RekrutteringstreffBreadcrumbs } from './_ui/RekrutteringstreffBreadcrumbs';
import { RekrutteringstreffFilter } from './_ui/RekrutteringstreffFilter';
import {
  opprettNyttRekrutteringstreff,
  OpprettNyttRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import SideScroll from '@/components/SideScroll';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { Button } from '@navikt/ds-react';
import { FC, ReactNode, useRef } from 'react';

export interface RekrutteringstreffSøkLayoutProps {
  children?: ReactNode | undefined;
}

const RekrutteringstreffSøkLayout: FC<RekrutteringstreffSøkLayoutProps> = ({
  children,
}) => {
  const { trackAndNavigate } = useUmami();
  const { valgtNavKontor } = useApplikasjonContext();
  const headerRef = useRef<HTMLDivElement>(null);

  const handleOpprettRekrutteringstreff = () => {
    const nyttTreff: OpprettNyttRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
      tittel: 'Treff uten navn',
    };

    opprettNyttRekrutteringstreff(nyttTreff)
      .then((response) => {
        const id = response.id;
        trackAndNavigate(
          UmamiEvent.Sidebar.opprettet_rekrutteringstreff,
          `/rekrutteringstreff/${id}?mode=edit`,
        );
      })
      .catch((error) => {
        throw new RekbisError({
          message: 'Feil ved opprettelse av nytt rekrutteringstreff:',
          error,
        });
      });
  };

  return (
    <SideLayout
      header={
        <div ref={headerRef}>
          <PanelHeader>
            <PanelHeader.Section
              actionsLeft={<RekrutteringstreffBreadcrumbs />}
              actionsRight={
                <Button onClick={handleOpprettRekrutteringstreff}>
                  Nytt rekrutteringstreff
                </Button>
              }
            />
          </PanelHeader>
        </div>
      }
    >
      <SideScroll>
        <div className='space-y-4'>
          <RekrutteringstreffFilter />
          {children}
        </div>
      </SideScroll>
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
