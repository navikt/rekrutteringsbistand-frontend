import KopierStillingLenke from './KopierStillingLenke';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: KopierStillingLenke,
} satisfies Meta<typeof KopierStillingLenke>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { stillingsData: mockBaseStilling },
};
