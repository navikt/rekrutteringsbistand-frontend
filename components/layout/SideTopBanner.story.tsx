import SideTopBanner from './SideTopBanner';
import { Button, Tag } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: SideTopBanner,
} satisfies Meta<typeof SideTopBanner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { tittel: 'Stor tittel' } };
export const MedChip: Story = {
  args: { tittel: 'Tittel', chip: <Tag variant='neutral'>Ny</Tag> },
};
export const MedElementer: Story = {
  args: {
    tittel: 'Tittel',
    tittelElementer: [
      <Tag key='1' variant='neutral'>
        Status
      </Tag>,
      <Tag key='2' variant='info'>
        Under arbeid
      </Tag>,
    ],
  },
};
export const MedKnapperad: Story = {
  args: {
    tittel: 'Tittel',
    knappIBanner: <Button size='small'>Lagre</Button>,
  },
};
