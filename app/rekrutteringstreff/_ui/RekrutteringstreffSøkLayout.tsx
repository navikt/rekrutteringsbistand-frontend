'use client';

import RekrutteringstreffSøkSortering from './RekrutteringstreffSøkSortering';
import TreffStatusFilter from './TreffStatusFilter';
import {
  opprettRekrutteringstreff,
  OpprettRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/mutations';
import WorkOpPilottilgang from '@/app/rekrutteringstreff/WorkOpPilottilgang';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import RekrutteringstreffSøkebar from '@/app/rekrutteringstreff/_ui/RekrutteringstreffSøkebar';
import TreffGeografiFilter from '@/app/rekrutteringstreff/_ui/TreffGeografiFilter';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import OpprettInfoDialog from '@/components/opprett/OpprettInfoDialog';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { formaterAnsattNavn } from '@/util/ansattNavn';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { Button } from '@navikt/ds-react';
import { FC, ReactNode, useRef, useState } from 'react';

export interface RekrutteringstreffSøkLayoutProps {
  children?: ReactNode | undefined;
}

const RekrutteringstreffSøkLayout: FC<RekrutteringstreffSøkLayoutProps> = ({
  children,
}) => {
  const { trackAndNavigate } = useUmami();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const { sokHook } = useRekrutteringstreffSøkFilter();
  const [visTreffInfo, setVisTreffInfo] = useState(false);

  const handleOpprettRekrutteringstreff = async () => {
    const nyttTreff: OpprettRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
      tittel: 'Treff uten navn',
      eierNavn: formaterAnsattNavn(brukerData),
    };

    try {
      const response = await opprettRekrutteringstreff(nyttTreff);
      trackAndNavigate(
        UmamiEvent.Sidebar.opprettet_rekrutteringstreff,
        `/rekrutteringstreff/${response.id}/rediger`,
      );
    } catch (error) {
      throw new RekbisError({
        message: 'Feil ved opprettelse av nytt rekrutteringstreff:',
        error,
      });
    }
  };

  const handleOpprettWorkOp = () => {
    const nyttWorkOp: OpprettRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
      tittel: 'WorkOp uten navn',
      kategori: RekrutteringstreffKategori.WORKOP,
      eierNavn: formaterAnsattNavn(brukerData),
    };
    opprettRekrutteringstreff(nyttWorkOp)
      .then((response) => {
        const id = response.id;
        trackAndNavigate(
          UmamiEvent.Sidebar.opprettet_workop,
          `/rekrutteringstreff/${id}/rediger`,
        );
      })
      .catch((error) => {
        throw new RekbisError({
          message: 'Feil ved opprettelse av nytt WorkOp:',
          error,
        });
      });
  };

  const loading = sokHook.isLoading || sokHook.isValidating;

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
                  <WorkOpPilottilgang>
                    <Button
                      size='small'
                      variant={'secondary'}
                      onClick={handleOpprettWorkOp}
                    >
                      Nytt WorkOp
                    </Button>
                  </WorkOpPilottilgang>
                  <Button size='small' onClick={() => setVisTreffInfo(true)}>
                    Nytt rekrutteringstreff
                  </Button>
                  <OpprettInfoDialog
                    type='rekrutteringstreff'
                    åpen={visTreffInfo}
                    onBekreft={handleOpprettRekrutteringstreff}
                    onLukk={() => setVisTreffInfo(false)}
                  />
                </TilgangskontrollForInnhold>
              }
            />
          </PanelHeader>
        </div>
      }
      sidepanelBredde='250px'
      sidepanelTittel='Filtrer'
      sidepanel={
        <div className='flex flex-col gap-4'>
          <RekrutteringstreffSøkebar />
          <RekrutteringstreffSøkSortering />
          <TreffStatusFilter
            statusaggregering={sokHook.data?.statusaggregering ?? []}
            publisertstatusaggregering={
              sokHook.data?.publisertstatusaggregering ?? []
            }
            loading={loading}
          />
          <TreffGeografiFilter />
        </div>
      }
      venstrePanel
    >
      <SideInnhold utenScroll>{children}</SideInnhold>
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
