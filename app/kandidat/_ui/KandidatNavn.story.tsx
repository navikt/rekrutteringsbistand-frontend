// Riktig sti til komponenten (ligger under vis-kandidat)
import KandidatNavn from '../vis-kandidat/_ui/KandidatNavn';
import { withKandidatContext } from '@/.storybook/KandidatContextDecorator';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Enkel kandidatnavn-komponent.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      {withKandidatContext(() => (
        <KandidatNavn />
      ))}
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
