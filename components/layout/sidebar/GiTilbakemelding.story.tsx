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
      <div className='flex h-[400px] overflow-hidden rounded-md border'>
        <Sidebar>
          <SidebarContent className='p-2'>
            <GiTilbakemelding />
          </SidebarContent>
          <SidebarFooter className='text-muted-foreground px-2 text-xs'>
            Footer
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
};
