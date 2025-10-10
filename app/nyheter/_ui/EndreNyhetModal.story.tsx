import EndreNyhetModal from './EndreNyhetModal';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <EndreNyhetModal refetch={() => {}} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
