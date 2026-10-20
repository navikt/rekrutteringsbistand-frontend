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

// Brekkpunktene er i rem (navnene viser px ved 16 px tekst). Da skaleres de med
// panelbredden når brukeren øker tekststørrelsen, og panelet blir et ark i stedet
// for å klemme innholdet (WCAG 1.4.4).
export const brekkpunktKlasser = {
  '720px': {
    panel: '@[45rem]/sidelayout:block',
    sheet: '@[45rem]/sidelayout:hidden',
  },
  '1024px': {
    panel: '@[64rem]/sidelayout:block',
    sheet: '@[64rem]/sidelayout:hidden',
  },
  '1280px': {
    panel: '@[80rem]/sidelayout:block',
    sheet: '@[80rem]/sidelayout:hidden',
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
        <SideScroll fokuserbar>
          <div className='sticky top-0 w-full p-5 [overflow-wrap:anywhere]'>
            {children}
          </div>
        </SideScroll>
      </aside>

      {/* Mobil: Sheet */}
      <div className={`block ${sheet}`}>
        <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
          <SheetContent className='bg-sidebar flex flex-col'>
            <SheetHeader className='shrink-0'>
              <SheetTitle>{sidepanelTittel}</SheetTitle>
            </SheetHeader>
            {/* Fokuserbar uten Tab-stopp, slik at innholdet kan rulles med tastatur etter klikk. */}
            <div
              tabIndex={-1}
              className='grow overflow-y-auto p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ax-border-focus)]'
            >
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
