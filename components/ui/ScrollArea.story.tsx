import { ScrollArea } from './scroll-area';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: ScrollArea,
  tags: ['autodocs'],
  args: { className: 'h-48 w-60 border rounded-md p-2' },
} satisfies Meta<typeof ScrollArea>;
export default meta;

type Story = StoryObj<typeof meta>;

const longContent = Array.from({ length: 30 }).map((_, i) => (
  <div key={i} className='text-sm'>
    Linje {i + 1}
  </div>
));

export const Standard: Story = {
  render: (args) => <ScrollArea {...args}>{longContent}</ScrollArea>,
};
