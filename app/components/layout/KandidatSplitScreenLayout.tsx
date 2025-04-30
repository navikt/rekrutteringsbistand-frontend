import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../components/ui/resizable';
import { SidebarProvider } from '../../../components/ui/sidebar';
import { useKandidatNavigeringContext } from '../../providers/KandidatNavigeringContext';
import HovedInnholdKort from './HovedInnholdKort';
import HøyreInnholdKort from './HøyreInnholdKort';
import * as React from 'react';

export interface KandidatSplitScreenLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode | undefined;
}

const KandidatSplitScreenLayout: React.FC<KandidatSplitScreenLayoutProps> = ({
  children,
  sidebar,
}) => {
  const [ekspanderHøyre, setEkspanderHøyre] = React.useState(false);
  const {
    nesteKandidat,
    forrigeKandidat,
    lukkSidebar,
    harNesteKandidat,
    harForrigeKandidat,
  } = useKandidatNavigeringContext();

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
        <ResizablePanel
          className={ekspanderHøyre ? 'hidden' : ''}
          style={{ minWidth: '550px' }}
        >
          <HovedInnholdKort className='h-[98vh] overflow-auto '>
            {children}
          </HovedInnholdKort>
        </ResizablePanel>

        <ResizableHandle className='z-20' />

        <ResizablePanel style={{ minWidth: '550px' }}>
          <HøyreInnholdKort
            lukkSidebar={lukkSidebar}
            nesteSide={harNesteKandidat ? nesteKandidat : null}
            forrigeSide={harForrigeKandidat ? forrigeKandidat : null}
            className='h-[98vh] overflow-auto min-w-[344px]'
            ekspanderHøyre={ekspanderHøyre}
            ekspanderSidebar={() => setEkspanderHøyre(!ekspanderHøyre)}
          >
            {sidebar}
          </HøyreInnholdKort>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
};

export default KandidatSplitScreenLayout;
