import FjernFåttJobbenKnapp from './FjernFåttJobbenKnapp';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ActionMenu, Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  tags: ['autodocs'],
  component: FjernFåttJobbenKnapp,
} satisfies Meta<typeof FjernFåttJobbenKnapp>;
export default meta;
type Story = StoryObj<typeof meta>;

const log = (utfall: KandidatutfallTyper) => alert('Utfall: ' + utfall);

export const Knapp: Story = {
  args: { endreUtfallForKandidat: log, loading: false },
};

export const Laster: Story = {
  args: { endreUtfallForKandidat: log, loading: true },
};

export const IMenu: Story = {
  args: { endreUtfallForKandidat: log, loading: false, actionMenu: true },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <FjernFåttJobbenKnapp {...args} />
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
};
