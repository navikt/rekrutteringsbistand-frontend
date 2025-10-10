import InnleggForm from './InnleggForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Innlegg form (duplisert)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <InnleggForm onUpdated={() => {}} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
