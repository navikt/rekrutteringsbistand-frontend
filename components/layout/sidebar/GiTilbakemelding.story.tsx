import GiTilbakemelding from './GiTilbakemelding';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
} from '@/components/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: GiTilbakemelding,
  tags: ['autodocs'],
} satisfies Meta<typeof GiTilbakemelding>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => (
    <SidebarProvider>
      <div className='flex h-[400px] border rounded-md overflow-hidden'>
        <Sidebar>
          <SidebarContent className='p-2'>
            <GiTilbakemelding />
          </SidebarContent>
          <SidebarFooter className='text-xs text-muted-foreground px-2'>
            Footer
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
};
