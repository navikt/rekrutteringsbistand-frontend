import OrganisasjonsnummerAlert from './OrganisasjonsnummerAlert';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: OrganisasjonsnummerAlert,
} satisfies Meta<typeof OrganisasjonsnummerAlert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Varsel: Story = {};
