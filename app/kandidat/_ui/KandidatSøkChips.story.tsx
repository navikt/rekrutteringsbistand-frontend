import KandidatSøkChips from './KandidatSøkChips';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert kandidat søk chips.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <KandidatSøkChips />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
