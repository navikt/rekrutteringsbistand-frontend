'use client';

import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { useThemeProvider } from '@/providers/ThemeProvider';
import { CogIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, Radio, RadioGroup } from '@navikt/ds-react';

enum FargeModus {
  LYS = 'LYS',
  MØRK = 'MØRK',
}

export default function Instillingerpage() {
  const { darkMode, setDarkMode } = useThemeProvider();
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            skjulBrødsmuler
            title={
              <div className='flex items-center gap-2'>
                <CogIcon /> Instillinger
              </div>
            }
          />
        </PanelHeader>
      }
    >
      <SideInnhold>
        <div className='flex flex-col gap-4 '>
          <Box.New background='neutral-soft' className='w-full' padding='4'>
            <div className='grid grid-cols-2 gap-4 '>
              <div>
                <Heading level='3' size='medium' spacing>
                  Fargemodus
                </Heading>
                <BodyShort>
                  Velg hvilken fargemodus du ønsker å bruke.
                </BodyShort>
              </div>

              <RadioGroup
                legend='Velg modus'
                onChange={setDarkMode}
                value={darkMode}
              >
                <Radio value={false}>Lys modus</Radio>
                <Radio value={true}>Mørk modus</Radio>
              </RadioGroup>
            </div>
          </Box.New>
          <Box.New background='neutral-soft' className='w-full' padding='4'>
            <div className='grid grid-cols-2 gap-4 '>
              <div>
                <Heading level='3' size='medium' spacing>
                  Sidevisning
                </Heading>
                <BodyShort>Velg hvordan nytt innhold skal åpne seg.</BodyShort>
              </div>

              <RadioGroup
                legend='Velg modus'
                onChange={setDarkMode}
                value={darkMode}
              >
                <Radio value={false}>Full side</Radio>
                <Radio value={true}>Vindu modus</Radio>
              </RadioGroup>
            </div>
          </Box.New>
        </div>
      </SideInnhold>
    </SideLayout>
  );
}
