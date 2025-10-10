import UlesteNyheterWrapper from './UlesteNyheterWrapper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: UlesteNyheterWrapper,
  tags: ['autodocs'],
  args: {
    children: (
      <div className='relative w-32 h-10 bg-surface-subtle rounded-md flex items-center justify-center'>
        Nyheter
      </div>
    ),
  },
} satisfies Meta<typeof UlesteNyheterWrapper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
