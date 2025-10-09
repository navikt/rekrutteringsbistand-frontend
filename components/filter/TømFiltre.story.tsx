import TømFiltre from './TømFiltre';
import { Chips } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: TømFiltre,
  decorators: [
    (Story) => (
      <Chips>
        <Chips.Removable>Heltid</Chips.Removable>
        <Chips.Removable>Oslo</Chips.Removable>
        <Chips.Removable>Fast ansettelse</Chips.Removable>
        <Story />
      </Chips>
    ),
  ],
} satisfies Meta<typeof TømFiltre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const MedCallback: Story = {
  args: {
    fjernFritekst: () => console.log('Fritekst fjernet'),
  },
};

export const MedEksludering: Story = {
  args: {
    exlude: ['portefolje', 'visKandidatnr'],
  },
};
