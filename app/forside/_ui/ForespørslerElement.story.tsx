import Forespørsler from './Forespørsler';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <Forespørsler
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
