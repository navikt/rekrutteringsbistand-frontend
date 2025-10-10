import Praktiskeforhold from './Praktiskeforhold';
import TittelForm from './TittelForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Delvis redigering subset (duplisert)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-6 opacity-60 pointer-events-none'>
      <TittelForm onUpdated={() => {}} />
      <Praktiskeforhold />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
