import FremdriftspanelArbeidsplassen from './arbeidsplassen/FremdriftspanelArbeidsplassen';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert arbeidsplassen panel (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <FremdriftspanelArbeidsplassen />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
