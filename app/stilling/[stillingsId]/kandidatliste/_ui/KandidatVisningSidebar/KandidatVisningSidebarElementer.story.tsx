import KandidatVisningSidebar from './KandidatVisningSidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert sidebar (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <KandidatVisningSidebar kandidatnr='PAM123456' />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
