import Statistikk from './Statistikk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Ekstra wrapper (duplisert) – kan slettes senere.
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <Statistikk />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
