import Erfaring from './Erfaring';
import Detaljer from '@/app/kandidat/[kandidatNr]/vis-kandidat/oversikt-fane/_ui/erfaring/Detaljer';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert erfaring/detaljer (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none'>
      <Erfaring />
      <Detaljer> Detalj </Detaljer>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
