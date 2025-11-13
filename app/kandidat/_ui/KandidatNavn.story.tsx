// Riktig sti til komponenten (ligger under vis-kandidat)
import KandidatNavn from '../[kandidatNr]/vis-kandidat/_ui/KandidatNavn';
import { withKandidatContext } from '@/.storybook/KandidatContextDecorator';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Enkel kandidatnavn-komponent.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      {withKandidatContext(() => (
        <KandidatNavn />
      ))}
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
