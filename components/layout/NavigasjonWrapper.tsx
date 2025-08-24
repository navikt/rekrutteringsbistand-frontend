// import { AppSidebar } from '@/components/app-sidebar';
import NavDekoratør from '@/components/layout/modiadekoratør/NavDekoratør';
import { AppSidebar } from '@/components/layout/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import * as React from 'react';

export interface NavigasjonWrapperProps {
  children?: React.ReactNode | undefined;
}

const NavigasjonWrapper: React.FC<NavigasjonWrapperProps> = ({ children }) => {
  return (
    <div className='[--header-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex flex-col'>
        <NavDekoratør />
        <div className='flex flex-1'>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default NavigasjonWrapper;
