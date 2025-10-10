import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary'>Meny</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
        <DropdownMenuItem>Åpne</DropdownMenuItem>
        <DropdownMenuItem>Dupliser</DropdownMenuItem>
        <DropdownMenuItem variant='destructive'>Slett</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const MedCheckboxOgRadio: Story = {
  render: () => {
    const [visAvansert, setVisAvansert] = useState(true);
    const [valg, setValg] = useState('a');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Meny</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Preferanser</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={visAvansert}
            onCheckedChange={(c) => setVisAvansert(Boolean(c))}
          >
            Vis avansert
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={valg} onValueChange={setValg}>
            <DropdownMenuRadioItem value='a'>
              Alternativ A
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='b'>
              Alternativ B
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Mer...</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Underpunkt 1</DropdownMenuItem>
              <DropdownMenuItem>Underpunkt 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
