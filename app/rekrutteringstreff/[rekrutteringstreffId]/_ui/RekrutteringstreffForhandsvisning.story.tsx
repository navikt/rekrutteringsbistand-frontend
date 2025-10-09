import RekrutteringstreffForhåndsvisning from './forhåndsvisning/RekrutteringstreffForhåndsvisning';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Forhåndsvisning alias story (inert)

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
