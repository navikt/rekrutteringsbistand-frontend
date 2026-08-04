'use client';

import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { useThemeProvider } from '@/providers/ThemeProvider';
import { CogIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Heading,
  List,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';

function Tast({ children }: { children: React.ReactNode }) {
  return (
    <kbd className='mx-0.5 inline-block rounded border border-(--ax-border-neutral-subtle) bg-(--ax-bg-default) px-1.5 py-0.5 align-baseline font-mono text-sm whitespace-nowrap text-(--ax-text-default) shadow-sm'>
      {children}
    </kbd>
  );
}

export default function Innstillingerpage() {
  const {
    darkMode,
    setDarkMode,
    windowMode,
    setWindowMode,
    tekststørrelse,
    setTekststørrelse,
  } = useThemeProvider();
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            skjulBrødsmuler
            title={
              <div className='flex items-center gap-2'>
                <CogIcon /> Innstillinger
              </div>
            }
          />
        </PanelHeader>
      }
    >
      <SideInnhold>
        <div className='flex flex-col gap-4'>
          <Box
            borderRadius='8'
            background='neutral-soft'
            className='w-full'
            padding='space-16'
          >
            <div className='grid grid-cols-2 gap-4'>
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
                hideLegend
              >
                <Radio value={false}>Lys modus</Radio>
                <Radio value={true}>Mørk modus</Radio>
              </RadioGroup>
            </div>
          </Box>
          <Box
            borderRadius='8'
            background='neutral-soft'
            className='w-full'
            padding='space-16'
          >
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Heading level='3' size='medium' spacing>
                  Visningsmodus
                </Heading>
                <BodyShort>Velg hvordan nytt innhold skal åpne seg.</BodyShort>
              </div>

              <RadioGroup
                legend='Velg modus'
                hideLegend
                onChange={setWindowMode}
                value={windowMode}
              >
                <Radio
                  value={false}
                  description='Åpner alltid innholdet på en egen side.'
                >
                  Full side
                </Radio>
                <Radio
                  value={true}
                  description='Åpner innholdet på siden av skjermen.'
                >
                  Sidevisning
                </Radio>
              </RadioGroup>
            </div>
          </Box>
          <Box
            borderRadius='8'
            background='neutral-soft'
            className='w-full'
            padding='space-16'
          >
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Heading level='3' size='medium' spacing>
                  Tekststørrelse
                </Heading>
                <BodyShort>
                  Velg hvor stor tekst og innhold skal vises som.
                </BodyShort>
              </div>

              <RadioGroup
                legend='Velg tekststørrelse'
                hideLegend
                onChange={setTekststørrelse}
                value={tekststørrelse}
              >
                <Radio value='liten'>Liten</Radio>
                <Radio value='standard'>Standard</Radio>
                <Radio value='stor'>Stor</Radio>
                <Radio value='ekstra-stor'>Ekstra stor</Radio>
              </RadioGroup>
            </div>
          </Box>
          <Box
            borderRadius='8'
            background='neutral-soft'
            className='w-full'
            padding='space-16'
          >
            <Heading level='3' size='medium' spacing>
              Tastaturnavigasjon
            </Heading>
            <BodyShort spacing>
              Hele løsningen kan brukes med tastatur. Her er de viktigste
              tastene:
            </BodyShort>
            <List as='ul'>
              <List.Item>
                <Tast>Tab</Tast> og <Tast>Shift</Tast> + <Tast>Tab</Tast>{' '}
                flytter fokus til neste eller forrige element, for eksempel
                knapper, lenker, menyvalg i sidemenyen og kort i en liste.
              </List.Item>
              <List.Item>
                <Tast>Enter</Tast> aktiverer lenker og knapper.{' '}
                <Tast>Mellomrom</Tast> huker av avkrysningsbokser og trykker på
                knapper.
              </List.Item>
              <List.Item>
                <Tast>Pil&nbsp;venstre</Tast> og <Tast>Pil&nbsp;høyre</Tast>{' '}
                bytter mellom faner (for eksempel «Om treffet», «Jobbsøkere» og
                «Arbeidsgivere»). <Tast>Tab</Tast> tar deg videre fra fanene og
                inn i innholdet.
              </List.Item>
              <List.Item>
                <Tast>Pil&nbsp;opp</Tast> og <Tast>Pil&nbsp;ned</Tast> flytter
                mellom valgene i nedtrekksmenyer (som «Opprett» og saksmenyen
                «...» på et kort) og mellom radioknapper i en gruppe.
              </List.Item>
              <List.Item>
                <Tast>Esc</Tast> lukker åpne menyer, dialoger og sidepaneler.
              </List.Item>
              <List.Item>
                Når du trykker <Tast>Tab</Tast> øverst på siden får du opp en
                «Hopp til hovedinnhold»-lenke som lar deg hoppe forbi menyen.
              </List.Item>
            </List>
          </Box>
        </div>
      </SideInnhold>
    </SideLayout>
  );
}
