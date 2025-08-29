'use client';

import { KandidatSøkProvider } from './KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';
import WindowVisKandidat from '@/app/_windows/vis-kandidat-window/WindowVisKandidat';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

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
          {children}
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default KandidatSokLayout;
