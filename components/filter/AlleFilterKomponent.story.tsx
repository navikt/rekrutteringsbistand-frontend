import AlleFilterKomponent from './AlleFilterKomponent';
import FilterChip from './FilterChip';
import { Chips } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

// Inert visning av filter-sheet med eksempelinnhold

const meta = {
  tags: ['autodocs'],
  render: () => {
    const [valgte, setValgte] = useState(['heltid', 'Oslo']);
    return (
      <div className='opacity-60 pointer-events-none space-y-6'>
        <AlleFilterKomponent>
          <Chips>
            <FilterChip type={valgte} setVerdi={setValgte} />
          </Chips>
        </AlleFilterKomponent>
      </div>
    );
  },
} satisfies Meta;
export default meta;

export type Story = StoryObj<typeof meta>;
export const Eksempel: Story = {};
