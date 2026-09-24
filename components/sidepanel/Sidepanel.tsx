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
  '250px': 'w-[15.625rem]',
  '320px': 'w-[20rem]',
} as const;

export type SidepanelBreddeProp = keyof typeof sidepanelBreddeVariabler;

export const brekkpunktKlasser = {
  '720px': {
    panel: '@[720px]/sidelayout:block',
    sheet: '@[720px]/sidelayout:hidden',
  },
  '1024px': {
    panel: '@[1024px]/sidelayout:block',
    sheet: '@[1024px]/sidelayout:hidden',
  },
  '1280px': {
    panel: '@[1280px]/sidelayout:block',
    sheet: '@[1280px]/sidelayout:hidden',
  },
} as const;

export type SidepanelBrekkpunkt = keyof typeof brekkpunktKlasser;

export interface SidepanelProps {
  children: React.ReactNode;
  sidepanelBredde?: SidepanelBreddeProp;
  sidepanelTittel?: string;
  sidepanelBrekkpunkt?: SidepanelBrekkpunkt;
  venstrePanel?: boolean;
}

export default function Sidepanel({
  children,
  sidepanelBredde = '320px',
  sidepanelTittel = 'Panel',
  sidepanelBrekkpunkt,
  venstrePanel,
}: SidepanelProps) {
  const widthClass = sidepanelBreddeVariabler[sidepanelBredde];
  const { panel, sheet } =
    brekkpunktKlasser[
      sidepanelBrekkpunkt ?? (venstrePanel ? '1024px' : '720px')
    ];
  const { isSheetOpen, closeSheet } = useSideLayoutContext();

  return (
    <>
      {/* Desktop: Vanlig sidepanel */}
      <aside
        aria-label='Sidepanel'
        className={
          `hidden h-full ${widthClass} ${panel} ` +
          (venstrePanel
            ? 'border-r border-r-[var(--ax-border-neutral-subtle)]'
            : 'border-l border-l-[var(--ax-border-neutral-subtle)]')
        }
      >
        <SideScroll>
          <div className='sticky top-0 w-full p-5'>{children}</div>
        </SideScroll>
      </aside>

      {/* Mobil: Sheet */}
      <div className={`block ${sheet}`}>
        <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
          <SheetContent className='bg-sidebar flex flex-col'>
            <SheetHeader className='shrink-0'>
              <SheetTitle>{sidepanelTittel}</SheetTitle>
            </SheetHeader>
            <div className='grow overflow-y-auto p-4'>{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
