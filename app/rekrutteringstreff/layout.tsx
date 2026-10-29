import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: sidetittel('Rekrutteringstreff') };

export interface RekrutteringstreffLayoutProps {
  children: React.ReactNode;
}

export default function RekrutteringstreffLayout({
  children,
}: RekrutteringstreffLayoutProps) {
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      {children}
    </TilgangskontrollForInnhold>
  );
}
