import FinnKandidaterForRekrutteringstreff from './FinnKandidaterForRekrutteringstreff';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <FinnKandidaterForRekrutteringstreff />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
