import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Underkomponenter for sidebar (duplikat sti – ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none flex gap-6 opacity-60'>
      <SisteAktivitet />
      <Profilkvalitet />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
