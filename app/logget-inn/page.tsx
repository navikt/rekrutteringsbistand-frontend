import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { sidetittel } from '@/util/sidetittel';
import { BodyLong, VStack } from '@navikt/ds-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: sidetittel('Logget inn'),
};

// Hit kommer brukeren etter å ha logget inn på nytt fra sesjonsvarselet, som
// åpner innloggingen i en ny fane.
export default function LoggetInnPage() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section title='Du er logget inn igjen' skjulBrødsmuler />
        </PanelHeader>
      }
    >
      <SideInnhold>
        <VStack gap='space-16'>
          <BodyLong>
            Du kan lukke denne fanen og gå tilbake til fanen du jobbet i. Det du
            har fylt ut, ligger der fortsatt.
          </BodyLong>
        </VStack>
      </SideInnhold>
    </SideLayout>
  );
}
