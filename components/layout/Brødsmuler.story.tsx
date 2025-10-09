import Brødsmuler from './Brødsmuler';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: Brødsmuler,
  args: { customPath: '/rekrutteringstreff/stilling/vis-kandidat/123' },
} satisfies Meta<typeof Brødsmuler>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const KortSti: Story = { args: { customPath: '/stilling/123' } };
export const MangeSegmenter: Story = {
  args: { customPath: '/a/b/c/d/e/f/g/h' },
};
export const BegrensetSynlig: Story = {
  args: { customPath: '/a/b/c/d/e/f/g/h', maxVisible: 3 },
};
