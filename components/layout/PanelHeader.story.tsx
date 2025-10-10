import PanelHeader, { PanelHeaderSection } from './PanelHeader';
import { Button, Tabs } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: PanelHeader,
} satisfies Meta<typeof PanelHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Enkelt: Story = {
  render: () => (
    <PanelHeader>
      <PanelHeaderSection title='Tittel' subtitle='Undertittel' />
    </PanelHeader>
  ),
} as any;

export const MedActionsOgTabs: Story = {
  render: () => (
    <Tabs>
      <PanelHeader>
        <PanelHeaderSection
          title='Rediger stilling'
          subtitle='Oppdatert for 2 min siden'
          actionsRight={<Button size='small'>Lagre</Button>}
          tabs={
            <>
              <Tabs.Tab value={'tab1'} label='Oversikt' />
              <Tabs.Tab value={'tab2'} label='Aktiviteter' />
            </>
          }
        />
      </PanelHeader>
    </Tabs>
  ),
} as any;

export const FlereSeksjoner: Story = {
  render: () => (
    <PanelHeader>
      <PanelHeaderSection title='Overordnet seksjon' />
      <PanelHeaderSection title='Underseksjon A' />
      <PanelHeaderSection title='Underseksjon B' />
    </PanelHeader>
  ),
} as any;
