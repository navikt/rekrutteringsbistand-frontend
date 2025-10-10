import { Button } from './button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Sheet,
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;
export default meta;

type Story = StoryObj<typeof meta>;

export const HøyrePanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Åpne panel</Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Innstillinger</SheetTitle>
          <SheetDescription>Konfigurer noe her.</SheetDescription>
        </SheetHeader>
        <div className='p-4 pt-0 text-sm space-y-2'>
          <p>Valg 1</p>
          <p>Valg 2</p>
          <p>Valg 3</p>
        </div>
        <SheetFooter>
          <Button variant='secondary'>Lagre</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const VenstrePanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary'>Åpne venstre</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Navigasjon</SheetTitle>
          <SheetDescription>Midlertidig sidepanel.</SheetDescription>
        </SheetHeader>
        <div className='p-4 pt-0 text-sm'>Noe innhold...</div>
      </SheetContent>
    </Sheet>
  ),
};
