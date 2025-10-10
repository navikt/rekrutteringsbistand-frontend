import MittStandardsøk from './MittStandardsøk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert standardsøk element (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <MittStandardsøk />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
