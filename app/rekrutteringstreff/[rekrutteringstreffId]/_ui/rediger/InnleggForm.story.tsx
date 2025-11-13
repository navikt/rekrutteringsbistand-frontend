import InnleggForm from './InnleggForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Innlegg form (duplisert)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <InnleggForm onUpdated={() => {}} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
