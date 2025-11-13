import Utfallsstatistikk from './Utfallsstatistikk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <Utfallsstatistikk
        navKontor='1234'
        fraOgMed={new Date()}
        tilOgMed={new Date()}
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
