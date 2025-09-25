export interface FremdriftspanelProps {
  children: React.ReactNode;
}

export default function Fremdriftspanel({ children }: FremdriftspanelProps) {
  return (
    <aside
      aria-label='Fremdriftspanel'
      className='w-full h-full md:w-[320px] border-l border-l-[var(--ax-border-neutral-subtle)] py-3 pl-5 '
    >
      <div className='sticky top-0 w-full'>{children}</div>
    </aside>
  );
}
