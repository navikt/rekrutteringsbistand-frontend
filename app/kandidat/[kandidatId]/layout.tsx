import * as React from 'react';
import { Roller } from '../../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { KandidatContextProvider } from './KandidatContext';
import KandidatSideLayout from './KandidatsideLayout';

interface KandidatSideRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ kandidatId: string }>;
}
export default async function KandidatSideRootLayout({
  children,
  params,
}: KandidatSideRootLayoutProps) {
  const kandidatId = (await params).kandidatId;
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatContextProvider kandidatId={kandidatId}>
        <KandidatSideLayout>{children}</KandidatSideLayout>
      </KandidatContextProvider>
    </TilgangskontrollForInnhold>
  );
}
