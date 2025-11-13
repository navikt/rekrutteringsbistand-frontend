import RekrutteringstreffForhåndsvisning from './RekrutteringstreffForhåndsvisning';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert forhåndsvisning

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <RekrutteringstreffForhåndsvisning />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
