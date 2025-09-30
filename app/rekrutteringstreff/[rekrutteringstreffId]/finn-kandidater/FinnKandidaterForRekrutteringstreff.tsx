'use client';

import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { FC, useMemo } from 'react';

const FinnKandidaterForRekrutteringstreff: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const fullskjermUrl = useMemo(
    () => `/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`,
    [rekrutteringstreffId],
  );

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <SideLayout
            header={
              <PanelHeader fullskjermUrl={fullskjermUrl}>
                <PanelHeader.Section
                  title='Finn kandidater til rekrutteringstreff'
                  subtitle='Søk og inviter jobbsøkere til treffet'
                />
              </PanelHeader>
            }
          >
            <KandidatTilRekrutteringstreff />
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterForRekrutteringstreff;
