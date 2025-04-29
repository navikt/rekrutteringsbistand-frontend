import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../components/ui/resizable';
import { SidebarProvider } from '../../../components/ui/sidebar';
import HovedInnholdKort from './HovedInnholdKort';
import HøyreInnholdKort from './HøyreInnholdKort';
import * as React from 'react';

export interface LayoutMedSidebarProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode | undefined;
  lukkSidebar?: () => void;
  nesteSide?: () => void;
  forrigeSide?: () => void;
}

const LayoutMedSidebar: React.FC<LayoutMedSidebarProps> = ({
  children,
  sidebar,
  lukkSidebar,
  nesteSide,
  forrigeSide,
}) => {
  // Fjerner standard scroll
  React.useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!sidebar) {
    return (
      <SidebarProvider>
        <HovedInnholdKort>{children}</HovedInnholdKort>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel>
          <HovedInnholdKort className='h-[98vh] overflow-auto '>
            {children}
          </HovedInnholdKort>
        </ResizablePanel>

        <ResizableHandle className='z-20' />

        <ResizablePanel defaultSize={35} minSize={25}>
          <HøyreInnholdKort
            className='h-[98vh] overflow-auto '
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

export default LayoutMedSidebar;
