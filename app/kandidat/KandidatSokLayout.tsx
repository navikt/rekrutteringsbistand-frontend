'use client';

import { KandidatSøkProvider } from './KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';
import WindowVisKandidat from '@/app/_windows/vis-kandidat-window/WindowVisKandidat';
import SideBanner from '@/components/layout/SideBanner';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { PersonTallShortIcon } from '@navikt/aksel-icons';

export interface KandidatSokLayoutProps {
  children?: React.ReactNode | undefined;
}

const KandidatSokLayout: React.FC<KandidatSokLayoutProps> = ({ children }) => {
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <WindowVisKandidat />
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <SideLayout
            topBanner={
              <SideBanner
                ikon={<PersonTallShortIcon className='h-6 w-6' />}
                tittel='Jobbsøkere'
              />
            }
          >
            {children}
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default KandidatSokLayout;
