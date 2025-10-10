import KiLogg from './components/KiLogg';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <KiLogg />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
