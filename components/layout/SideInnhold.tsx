import SideScroll from '@/components/SideScroll';

export interface SideInnholdProps {
  children: React.ReactNode;
  utenScroll?: boolean;
  lagreScrollNøkkel?: string;
}

export default function SideInnhold({
  children,
  utenScroll,
  lagreScrollNøkkel,
}: SideInnholdProps) {
  if (utenScroll) {
    return <div className={'px-5 pt-5'}>{children}</div>;
  }
  return (
    <SideScroll lagreScrollNøkkel={lagreScrollNøkkel}>
      <div className={'px-5 pt-5'}>{children}</div>
    </SideScroll>
  );
}
