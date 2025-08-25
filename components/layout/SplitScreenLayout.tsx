//TODO Deprecated
// import HovedInnholdKort from './HovedInnholdKort';
// import HøyreInnholdKort from './HøyreInnholdKort';
// import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
// import { useVisKandidatNr } from '@/app/kandidat/vis-kandidat/useVisKandidatNr';
// import VisPerson from '@/app/rekrutteringstreff/[rekrutteringstreffId]/vis-person/VisPerson';
// import { useVisPersonTreffId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/vis-person/useVisPersonTreffId';
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from '@/components/ui/resizable';
// import { SidebarProvider } from '@/components/ui/sidebar';
// import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
// import * as React from 'react';

// export interface SplitScreenLayoutProps {
//   children: React.ReactNode;
// }

// export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
//   children,
// }) => {
//   const [visKandidatnr, setVisKandidatnr] = useVisKandidatNr();
//   const [visPersonTreffId, setVisTreffId] = useVisPersonTreffId();

//   const [ekspanderHøyre, setEkspanderHøyre] = React.useState(false);
//   const {
//     nesteKandidat,
//     forrigeKandidat,
//     harNesteKandidat,
//     harForrigeKandidat,
//   } = useKandidatNavigeringContext();

//   const getSidebarComponent = () => {
//     if (visPersonTreffId) {
//       return <VisPerson personTreffId={visPersonTreffId} />;
//     }
//     if (visKandidatnr) {
//       return <VisKandidat kandidatnr={visKandidatnr} />;
//     }
//     return null;
//   };

//   const sidebarComponent = getSidebarComponent();

//   const lukkSidebar = () => {
//     setVisKandidatnr('');
//     setVisTreffId('');
//   };

//   React.useEffect(() => {
//     if (visPersonTreffId || visKandidatnr) {
//       const originalStyle = document.body.style.overflow;
//       document.body.style.overflow = 'hidden';
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [visPersonTreffId, visKandidatnr]);

//   return (
//     <SidebarProvider>
//       <ResizablePanelGroup direction='horizontal' className='@container'>
//         <ResizablePanel
//           className={ekspanderHøyre ? 'hidden' : ''}
//           style={{ minWidth: '550px' }}
//         >
//           <HovedInnholdKort className='h-[95vh]'>{children}</HovedInnholdKort>
//         </ResizablePanel>

//         <ResizableHandle className='z-20' />

//         <ResizablePanel
//           style={{ minWidth: '550px' }}
//           className={!sidebarComponent ? 'hidden' : ''}
//         >
//           <HøyreInnholdKort
//             lukkSidebar={lukkSidebar}
//             nesteSide={harNesteKandidat ? nesteKandidat : null}
//             forrigeSide={harForrigeKandidat ? forrigeKandidat : null}
//             className='h-[95vh] overflow-auto min-w-[344px]'
//             ekspanderHøyre={ekspanderHøyre}
//             ekspanderSidebar={() => setEkspanderHøyre(!ekspanderHøyre)}
//           >
//             {sidebarComponent}
//           </HøyreInnholdKort>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </SidebarProvider>
//   );
// };
