import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function OpprettStilling() {
  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={15}>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
}
