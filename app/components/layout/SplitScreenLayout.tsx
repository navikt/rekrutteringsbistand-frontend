import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../components/ui/resizable';
import { SidebarProvider } from '../../../components/ui/sidebar';
import VisKandidat from '../../kandidat/vis-kandidat/VisKandidat';
import { useVisKandidatNr } from '../../kandidat/vis-kandidat/useVisKandidatNr';
import { useKandidatNavigeringContext } from '../../providers/KandidatNavigeringContext';
import VisPerson from '../../rekrutteringstreff/[rekrutteringstreffId]/vis-person/VisPerson';
import { useVisPersonTreffId } from '../../rekrutteringstreff/[rekrutteringstreffId]/vis-person/useVisPersonTreffId';
import HovedInnholdKort from './HovedInnholdKort';
import HøyreInnholdKort from './HøyreInnholdKort';
import * as React from 'react';

export interface SplitScreenLayoutProps {
  children: React.ReactNode;
}

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
  children,
}) => {
  const [visKandidatnr] = useVisKandidatNr();
  const [visPersonTreffId] = useVisPersonTreffId();

  const [ekspanderHøyre, setEkspanderHøyre] = React.useState(false);
  const {
    nesteKandidat,
    forrigeKandidat,
    lukkSidebar,
    harNesteKandidat,
    harForrigeKandidat,
  } = useKandidatNavigeringContext();

  const getSidebarComponent = () => {
    if (visPersonTreffId) {
      return <VisPerson personTreffId={visPersonTreffId} />;
    }
    if (visKandidatnr) {
      return <VisKandidat kandidatnr={visKandidatnr} />;
    }
    return null;
  };

  React.useEffect(() => {
    if (visPersonTreffId || visKandidatnr) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [getSidebarComponent]);

  return (
    <SidebarProvider>
      <ResizablePanelGroup direction='horizontal' className='@container'>
        <ResizablePanel
          className={ekspanderHøyre ? 'hidden' : ''}
          style={{ minWidth: '550px' }}
        >
          <HovedInnholdKort className='h-[98vh]'>{children}</HovedInnholdKort>
        </ResizablePanel>

        <ResizableHandle className='z-20' />

        <ResizablePanel
          style={{ minWidth: '550px' }}
          className={!getSidebarComponent() ? 'hidden' : ''}
        >
          <HøyreInnholdKort
            lukkSidebar={lukkSidebar}
            nesteSide={harNesteKandidat ? nesteKandidat : null}
            forrigeSide={harForrigeKandidat ? forrigeKandidat : null}
            className='h-[98vh] overflow-auto min-w-[344px]'
            ekspanderHøyre={ekspanderHøyre}
            ekspanderSidebar={() => setEkspanderHøyre(!ekspanderHøyre)}
          >
            {getSidebarComponent()}
          </HøyreInnholdKort>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
};
