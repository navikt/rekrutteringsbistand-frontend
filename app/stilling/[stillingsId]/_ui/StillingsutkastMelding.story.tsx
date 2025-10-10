import StillingsutkastMelding from './StillingsutkastMelding';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert melding for stillingsutkast.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none max-w-lg'>
      <StillingsutkastMelding />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
