import KandidatKnapper from './KandidatKnapper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <KandidatKnapper />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
