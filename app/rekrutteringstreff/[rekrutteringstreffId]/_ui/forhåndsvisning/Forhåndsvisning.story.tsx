import RekrutteringstreffForhåndsvisning from './RekrutteringstreffForhåndsvisning';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert forhåndsvisning
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <RekrutteringstreffForhåndsvisning />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
