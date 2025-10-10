import Definisjon from './Definisjon';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: Definisjon,
} satisfies Meta<typeof Definisjon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    tittel: 'Annonsenummer',
    innhold: '123456',
  },
};

export const UtenInnhold: Story = {
  args: { tittel: 'Referanse', innhold: null },
};
