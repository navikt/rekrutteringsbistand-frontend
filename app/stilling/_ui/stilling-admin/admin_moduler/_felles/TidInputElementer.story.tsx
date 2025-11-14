import { DatoVelger } from './DatoVelger';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Eksempel på enkel felles input (kan evt. fjernes hvis overflødig).

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none max-w-xs opacity-60'>
      <DatoVelger label='Dato' setDato={() => {}} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
