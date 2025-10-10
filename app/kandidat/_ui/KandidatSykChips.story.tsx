import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// (Mulig skrivefeil - placeholder file to highlight typo if occurs)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='text-xs opacity-60'>
      Placeholder for potensielt feilnavn &quot;KandidatSykChips&quot;
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
