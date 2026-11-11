'use client';

import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingsSøkFilter from './_ui/StillingsSøkFilter';
import StillingsLagredeSøk from '@/app/stilling/_ui/StillingsLagredeSøk';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from '@/app/stilling/_ui/StillingsSøkFilter/KategoriFilter';
import StatusFilter from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';
import StillingSøkebar from '@/app/stilling/_ui/StillingsSøkFilter/StillingSøkebar';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { OpprettKnapp } from '@/components/opprett/OpprettKnapp';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { FC, useEffect } from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  forKandidatNr?: string;
}

const StillingsSøkLayout: FC<StillingsSøkProps> = ({
  formidlinger,
  forKandidatNr,
}) => {
  const { track } = useUmami();

  useEffect(() => {
    if (forKandidatNr) {
      track(UmamiEvent.Stilling.forslag_til_stilling_fane);
    }
  }, [forKandidatNr, track]);

  return (
    <SideLayout
      venstrePanel
      sidepanelTittel='Filtrer'
      header={
        <PanelHeader>
          <PanelHeader.Section
            actionsRight={
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                ]}
              >
                <OpprettKnapp kategori={Stillingskategori.Stilling} />
              </TilgangskontrollForInnhold>
            }
          />
        </PanelHeader>
      }
      sidepanelBredde='250px'
      sidepanel={
        <div className='flex flex-col gap-4'>
          <StillingSøkebar />
          <StillingsLagredeSøk />
          <StillingsSøkSortering />
          <StatusFilter />
          <GeografiFilter />
          <KategoriFilter />
          <InkluderingFilter />
        </div>
      }
    >
      <SideInnhold utenScroll>
        <div className='@container flex contain-layout'>
          <div className='min-w-0 flex-grow'>
            <StillingsSøkFilter
              formidlinger={formidlinger}
              stillingForKandidat={forKandidatNr}
            />
            <div className='@container flex contain-layout'>
              <div className='min-w-0 flex-grow'>
                <StillingsSøkeresultat kandidatId={forKandidatNr} />
              </div>
            </div>
          </div>
        </div>
      </SideInnhold>
    </SideLayout>
  );
};

export default StillingsSøkLayout;
