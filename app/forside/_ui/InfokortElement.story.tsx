import Infokort from './Infokort';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <Infokort tittel='Demo' tall={0} ikonFront />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
