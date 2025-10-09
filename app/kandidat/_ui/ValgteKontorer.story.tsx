import ValgteKontorer from './ValgteKontorer';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: ValgteKontorer,
  tags: ['autodocs'],
  render: () => (
    <div className='text-sm opacity-60'>
      <p>
        Placeholder – komponenten avhenger av kontekst/hook. For full funksjon
        bør relevant provider mocks settes opp.
      </p>
      <ValgteKontorer />
    </div>
  ),
} satisfies Meta<typeof ValgteKontorer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
