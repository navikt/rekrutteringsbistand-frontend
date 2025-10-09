import SkeletonKort from './SkeletonKort';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: SkeletonKort,
} satisfies Meta<typeof SkeletonKort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
