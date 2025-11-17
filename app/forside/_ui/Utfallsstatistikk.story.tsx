import Utfallsstatistikk from './Utfallsstatistikk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Denne komponenten er data-drevet gjennom hook; vi mocker via args og en wrapper.

const meta = {
  tags: ['autodocs'],
  // Vi bruker en dummy komponent for å illustrere typical layout (reell hook mocking gjøres i dekorator i større testoppsett).
  render: () => (
    <div className='space-y-4'>
      <p className='text-muted-foreground text-sm'>
        Viser skjelett / placeholder i Storybook uten SWR-mock. For full visning
        trengs mock av useStatistikk.
      </p>
      <div className='pointer-events-none opacity-50'>
        <Utfallsstatistikk
          navKontor='1234'
          fraOgMed={new Date()}
          tilOgMed={new Date()}
        />
      </div>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
