import Statistikk from './Statistikk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Ekstra wrapper (duplisert) – kan slettes senere.
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <Statistikk />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
