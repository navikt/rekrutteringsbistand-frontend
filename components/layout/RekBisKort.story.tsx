import RekBisKort from './RekBisKort';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: RekBisKort,
} satisfies Meta<typeof RekBisKort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RekBisKort>
      <div className='p-6 space-y-2'>
        <p>Innhold inni kortet.</p>
        <p>Scrollhøyde testes hvis innhold blir langt.</p>
      </div>
    </RekBisKort>
  ),
};
