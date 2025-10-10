import Forespørsler from './Forespørsler';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>
        Viser inaktiv komponent (krever SWR hook mock for data). Placeholder i
        Storybook.
      </p>
      <div className='opacity-50 pointer-events-none'>
        <Forespørsler
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
