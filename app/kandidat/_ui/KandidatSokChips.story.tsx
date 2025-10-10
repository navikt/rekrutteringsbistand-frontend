import KandidatSøkChips from './KandidatSøkChips';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert variant (feilsti duplikat – kan ryddes senere)
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
