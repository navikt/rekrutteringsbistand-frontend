import { Button } from './button';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarFooter,
  SidebarInput,
} from './sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InboxIcon, SettingsIcon, UsersIcon } from 'lucide-react';

const meta = {
  tags: ['autodocs'],
  component: SidebarProvider,
  args: {},
} satisfies Meta<typeof SidebarProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => (
    <SidebarProvider>
      <div className='flex h-[480px] w-full border rounded-md overflow-hidden'>
        <Sidebar>
          <SidebarHeader>
            <SidebarInput placeholder='Søk...' />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Hoved</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip='Innboks'>
                      <InboxIcon /> <span>Innboks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip='Brukere'>
                      <UsersIcon /> <span>Brukere</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip='Innstillinger'>
                      <SettingsIcon /> <span>Innstillinger</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive>
                          Profil
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Varsler</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </SidebarContent>
          <SidebarFooter className='text-xs text-muted-foreground px-2'>
            <div>v1.0.0</div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className='p-4 flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <h3 className='font-semibold'>Innhold</h3>
          </div>
          <p className='text-sm max-w-prose'>
            Dette er en minimal demonstrasjon av sidebaren. Bruk toggle-knappen
            for å kollapse/utvide og se tooltip oppførsel.
          </p>
          <Button>Primær handling</Button>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};
