import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  args: { direction: 'horizontal' },
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof ResizablePanelGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Horisontal: Story = {
  render: (args) => (
    <div style={{ height: 240 }}>
      <ResizablePanelGroup {...args} className='border rounded-md'>
        <ResizablePanel defaultSize={35} className='p-2 text-sm'>
          Venstre
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} className='p-2 text-sm bg-muted/30'>
          Høyre
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertikal: Story = {
  args: { direction: 'vertical' },
  render: (args) => (
    <div style={{ height: 300 }}>
      <ResizablePanelGroup {...args} className='border rounded-md'>
        <ResizablePanel defaultSize={50} className='p-2 text-sm'>
          Topp
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} className='p-2 text-sm bg-muted/30'>
          Bunn
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
