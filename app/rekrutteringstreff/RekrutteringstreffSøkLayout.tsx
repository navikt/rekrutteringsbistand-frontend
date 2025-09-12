'use client';

import { RekrutteringstreffFilter } from './_ui/RekrutteringstreffFilter';
import {
  opprettNyttRekrutteringstreff,
  OpprettNyttRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { ReceptionIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export interface RekrutteringstreffSøkLayoutProps {
  children?: ReactNode | undefined;
}

const RekrutteringstreffSøkLayout: FC<RekrutteringstreffSøkLayoutProps> = ({
  children,
}) => {
  const { trackAndNavigate } = useUmami();
  const { valgtNavKontor } = useApplikasjonContext();

  const handleOpprettRekrutteringstreff = () => {
    const nyttTreff: OpprettNyttRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
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
        <PanelHeader>
          <PanelHeader.Section
            title={'Rekrutteringstreff'}
            titleIcon={<ReceptionIcon />}
            actionsRight={
              <Button onClick={handleOpprettRekrutteringstreff}>
                Nytt rekrutteringstreff
              </Button>
            }
          />
        </PanelHeader>
      }
    >
      <RekrutteringstreffFilter />
      {children}
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
