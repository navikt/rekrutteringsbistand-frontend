import Praktiskeforhold from './Praktiskeforhold';
import TittelForm from './TittelForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Delvis redigering subset (duplisert)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none space-y-6 opacity-60'>
      <TittelForm onUpdated={() => {}} />
      <Praktiskeforhold />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
