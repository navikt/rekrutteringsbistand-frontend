import FilterChip from './FilterChip';
import { Chips } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

// Enkel inert demonstrasjon av FilterChip

const meta = {
  tags: ['autodocs'],
  render: () => {
    const [valg, setValg] = useState(['heltid', 'Oslo']);
    return (
      <div className='opacity-60 pointer-events-none'>
        <Chips>
          <FilterChip type={valg} setVerdi={setValg} />
        </Chips>
      </div>
    );
  },
} satisfies Meta;
export default meta;

export type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
