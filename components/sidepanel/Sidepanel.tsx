import SideScroll from '@/components/SideScroll';
import { useSideLayoutContext } from '@/components/layout/SideLayoutContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import * as React from 'react';

const sidepanelBreddeVariabler = {
  '250px': 'w-[250px]',
  '320px': 'w-[320px]',
} as const;

export type SidepanelBreddeProp = keyof typeof sidepanelBreddeVariabler;

export interface SidepanelProps {
  children: React.ReactNode;
  sidepanelBredde?: SidepanelBreddeProp;
  sidepanelTittel?: string;
}

export default function Sidepanel({
  children,
  sidepanelBredde = '320px',
  sidepanelTittel = 'Panel',
}: SidepanelProps) {
  const widthClass = sidepanelBreddeVariabler[sidepanelBredde];
  const { isSheetOpen, closeSheet } = useSideLayoutContext();

  return (
    <>
      {/* Desktop: Vanlig sidepanel */}
      <aside
        aria-label='Sidepanel'
        className={`hidden @[720px]/sidelayout:block h-full ${widthClass} border-l border-l-[var(--ax-border-neutral-subtle)]`}
      >
        <SideScroll>
          <div className='sticky top-0 w-full p-5'>{children}</div>
        </SideScroll>
      </aside>

      {/* Mobil: Sheet */}
      <div className='@[720px]/sidelayout:hidden block'>
        <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
          <SheetContent className='flex flex-col bg-sidebar'>
            <SheetHeader className='flex-shrink-0'>
              <SheetTitle>{sidepanelTittel}</SheetTitle>
            </SheetHeader>
            <div className='flex-grow overflow-y-auto p-4'>{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
