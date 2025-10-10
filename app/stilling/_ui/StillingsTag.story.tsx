import StillingsTag from './StillingsTag';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: StillingsTag,
} satisfies Meta<typeof StillingsTag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { stillingsData: mockBaseStilling },
};

export const PåRad: Story = {
  args: { stillingsData: mockBaseStilling, rad: true },
};
