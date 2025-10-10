import { createSidebarDecorator } from '../../.storybook/StoryProviders';
import OpprettMeny from './OpprettMeny';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: OpprettMeny,
  decorators: [createSidebarDecorator('h-[400px] w-[360px] border rounded-md')],
} satisfies Meta<typeof OpprettMeny>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
