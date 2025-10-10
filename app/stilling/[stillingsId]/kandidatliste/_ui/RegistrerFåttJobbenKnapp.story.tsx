import RegistrerFåttJobbenKnapp from './RegistrerFåttJobbenKnapp';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ActionMenu, Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  tags: ['autodocs'],
  component: RegistrerFåttJobbenKnapp,
} satisfies Meta<typeof RegistrerFåttJobbenKnapp>;
export default meta;
type Story = StoryObj<typeof meta>;

const log = (utfall: KandidatutfallTyper) => alert('Utfall valgt: ' + utfall);

export const Knapp: Story = {
  args: { endreUtfallForKandidat: log },
};

export const IMenu: Story = {
  args: { endreUtfallForKandidat: log },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <RegistrerFåttJobbenKnapp actionMenu {...args} />
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
};
