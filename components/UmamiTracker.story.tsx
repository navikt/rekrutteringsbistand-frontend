import { UmamiTracker } from './UmamiTracker';
import { UmamiDomene } from '@/util/umamiEvents';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: UmamiTracker,
  tags: ['autodocs'],
  args: {
    umamiProps: {
      event: { navn: 'Storybook demo event', domene: UmamiDomene.Generell },
      data: { variant: 'basic' },
    },
    children: 'Innhold med umami tracking',
  },
} satisfies Meta<typeof UmamiTracker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DivWrapper: Story = {
  args: { children: 'Knapp nedenfor' },
  render: (args) => (
    <UmamiTracker {...args}>
      <button type='button'>Klikk meg (data-attributter injiseres)</button>
    </UmamiTracker>
  ),
};

export const LenkeWrapper: Story = {
  args: {
    href: '#',
    umamiProps: {
      event: { navn: 'Storybook lenke event', domene: UmamiDomene.Generell },
      data: { variant: 'lenke' },
    },
    children: 'Lenke med umami attributter',
  },
  render: (args) => (
    <UmamiTracker {...args}>Lenke med umami attributter</UmamiTracker>
  ),
};
