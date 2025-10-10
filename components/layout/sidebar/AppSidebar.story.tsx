import { createSidebarDecorator } from '../../../.storybook/StoryProviders';
import { AppSidebar } from './AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: AppSidebar,
  decorators: [createSidebarDecorator('h-[540px] border rounded-md')],
  render: () => (
    <div className='flex h-full w-full'>
      <AppSidebar />
      <SidebarInset className='p-6'>Hovedinnhold</SidebarInset>
    </div>
  ),
} satisfies Meta<typeof AppSidebar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
