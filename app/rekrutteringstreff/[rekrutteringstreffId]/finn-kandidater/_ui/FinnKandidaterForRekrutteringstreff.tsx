'use client';

import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import {
  KandidatSøkPortefølje,
  KandidatSøkProvider,
} from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffBreadcrumbs } from '@/app/rekrutteringstreff/_ui/RekrutteringstreffBreadcrumbs';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

const FinnKandidaterForRekrutteringstreff: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { watch } = useFormContext<{ tittel?: string }>();

  const tittel = watch('tittel');
  const rekrutteringstreffNavn =
    typeof tittel === 'string' && tittel.trim().length > 0
      ? tittel.trim()
      : 'Rekrutteringstreff';

  const breadcrumbs = useMemo(
    () => [
      {
        href: `/rekrutteringstreff/${rekrutteringstreffId}`,
        label: rekrutteringstreffNavn,
      },
      { label: 'Legg til jobbsøker' },
    ],
    [rekrutteringstreffId, rekrutteringstreffNavn],
  );

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider defaultPortefølje={KandidatSøkPortefølje.ALLE}>
        <KandidatSøkMarkerteContextProvider>
          <SideLayout
            header={
              <PanelHeader>
                <PanelHeader.Section
                  actionsLeft={
                    <RekrutteringstreffBreadcrumbs items={breadcrumbs} />
                  }
                ></PanelHeader.Section>
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
