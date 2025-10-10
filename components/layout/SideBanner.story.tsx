import SideBanner from './SideBanner';
import { MegaphoneSpeakingIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: SideBanner,
} satisfies Meta<typeof SideBanner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Enkelt: Story = { args: { tittel: 'Banner' } };
export const MedIkon: Story = {
  args: { tittel: 'Info', ikon: <MegaphoneSpeakingIcon /> },
};
export const MedKnapper: Story = {
  args: {
    tittel: 'Handlinger',
    knapper: (
      <div className='flex gap-2'>
        <Button size='small'>Lagre</Button>
        <Button size='small' variant='secondary-neutral'>
          Avbryt
        </Button>
      </div>
    ),
  },
};
