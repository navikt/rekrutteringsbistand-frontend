import PopoverModal from './PopoverModal';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: PopoverModal,
  tags: ['autodocs'],
  args: {
    tittel: 'Dette er en popover modal',
    åpneKnapp: <button>Åpne modal</button>,
    children: <div>Innholdet i modalen</div>,
  },
} satisfies Meta<typeof PopoverModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
