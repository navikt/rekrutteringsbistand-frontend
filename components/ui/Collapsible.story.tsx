import { Button } from './button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  component: Collapsible,
  tags: ['autodocs'],
  args: { defaultOpen: true },
} satisfies Meta<typeof Collapsible>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant='secondary'>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='mt-2 text-sm border rounded-md p-3'>
          Innhold som kan skjules
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Kontrollert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant={open ? 'destructive' : 'default'}>
            {open ? 'Lukk' : 'Åpne'}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='mt-2 text-sm border rounded-md p-3'>
            Kontrollert innhold
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
