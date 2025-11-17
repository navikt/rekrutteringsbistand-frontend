import UlesteNyheterWrapper from './UlesteNyheterWrapper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: UlesteNyheterWrapper,
  tags: ['autodocs'],
  args: {
    children: (
      <div className='bg-surface-subtle relative flex h-10 w-32 items-center justify-center rounded-md'>
        Nyheter
      </div>
    ),
  },
} satisfies Meta<typeof UlesteNyheterWrapper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
