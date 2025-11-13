import Hendelser from './Hendelser';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert visning av hendelser (krever egentlig data fra API)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <Hendelser />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
