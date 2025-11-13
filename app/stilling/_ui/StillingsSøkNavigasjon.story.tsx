import StillingsSøkNavigasjon from './StillingsSøkNavigasjon';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert navigasjonsrad for stillingssøk.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <StillingsSøkNavigasjon />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
