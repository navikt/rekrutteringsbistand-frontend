import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../components/ui/resizable';
import { SidebarProvider } from '../../../components/ui/sidebar';
import HovedInnholdKort from './HovedInnholdKort';
import HøyreInnholdKort from './HøyreInnholdKort';
import * as React from 'react';

export interface SplitScreenLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode | undefined;
  lukkSidebar: () => void;
  nesteSide?: () => void;
  forrigeSide?: () => void;
}

const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
  children,
  sidebar,
  lukkSidebar,
  nesteSide,
  forrigeSide,
}) => {
  // Fjerner standard scroll
  React.useEffect(() => {
    if (sidebar) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [sidebar]);

  if (!sidebar) {
    return (
      <SidebarProvider>
        <HovedInnholdKort>{children}</HovedInnholdKort>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <ResizablePanelGroup direction='horizontal' className='@container'>
        <ResizablePanel style={{ minWidth: '550px' }}>
          <HovedInnholdKort className='h-[98vh] overflow-auto '>
            {children}
          </HovedInnholdKort>
        </ResizablePanel>

        <ResizableHandle className='z-20' />

        <ResizablePanel style={{ minWidth: '550px' }}>
          <HøyreInnholdKort
            className='h-[98vh] overflow-auto min-w-[344px]'
            lukkSidebar={lukkSidebar}
            nesteSide={nesteSide}
            forrigeSide={forrigeSide}
          >
            {sidebar}
          </HøyreInnholdKort>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
};

export default SplitScreenLayout;
