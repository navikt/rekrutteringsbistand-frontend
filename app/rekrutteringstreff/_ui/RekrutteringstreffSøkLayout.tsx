'use client';

import {
  opprettRekrutteringstreff,
  OpprettRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/mutations';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
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
    const nyttTreff: OpprettRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
      tittel: 'Treff uten navn',
    };

    opprettRekrutteringstreff(nyttTreff)
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
              actionsRight={
                <TilgangskontrollForInnhold
                  skjulVarsel
                  kreverEnAvRollene={[
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  ]}
                >
                  <Button onClick={handleOpprettRekrutteringstreff}>
                    Nytt rekrutteringstreff
                  </Button>
                </TilgangskontrollForInnhold>
              }
            />
          </PanelHeader>
        </div>
      }
    >
      <SideInnhold>
        {/* <RekrutteringstreffFilter /> */}
        {children}
      </SideInnhold>
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
