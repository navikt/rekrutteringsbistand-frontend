'use client';

import StillingsSøk from './StillingsSøk';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { OpprettKnapp } from '@/components/felles/opprett/OpprettKnapp';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export default function StillingsSøkIndex() {
  return (
    <SideLayout
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
    >
      <StillingsSøk />
    </SideLayout>
  );
}
