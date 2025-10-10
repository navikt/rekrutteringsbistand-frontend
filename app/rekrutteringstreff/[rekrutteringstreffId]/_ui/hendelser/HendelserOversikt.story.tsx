import Hendelser from './Hendelser';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Ekstra hendelser story (duplikat sti – ryddes ved behov)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <Hendelser />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
