export interface FremdriftspanelProps {
  children: React.ReactNode;
}

export default function Fremdriftspanel({ children }: FremdriftspanelProps) {
  return (
    <div className='w-[320px] border-l border-l-[var(--ax-border-neutral-subtle)] py-3 pl-5'>
      {children}
    </div>
  );
}
