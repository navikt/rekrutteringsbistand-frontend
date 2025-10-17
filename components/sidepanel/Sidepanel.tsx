import SideScroll from '@/components/SideScroll';

const sidepanelBreddeVariabler = {
  '250px': 'w-[250px]',
  '320px': 'w-[320px]',
} as const;

export type SidepanelBreddeProp = keyof typeof sidepanelBreddeVariabler;

export interface SidepanelProps {
  children: React.ReactNode;
  sidepanelBredde?: SidepanelBreddeProp;
}

export default function Sidepanel({
  children,
  sidepanelBredde = '320px',
}: SidepanelProps) {
  const widthClass = sidepanelBreddeVariabler[sidepanelBredde];

  return (
    <aside
      aria-label='Sidepanel'
      className={`h-full ${widthClass} border-l border-l-[var(--ax-border-neutral-subtle)]`}
    >
      <SideScroll>
        <div className='sticky top-0 w-full p-5'>{children}</div>
      </SideScroll>
    </aside>
  );
}
