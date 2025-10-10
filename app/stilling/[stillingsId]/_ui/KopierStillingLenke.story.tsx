import KopierStillingLenke from './KopierStillingLenke';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: KopierStillingLenke,
} satisfies Meta<typeof KopierStillingLenke>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { stillingsId: '00000000-0000-0000-0000-000000000000' },
};
