import SideScroll from '@/components/SideScroll';

export interface SideInnholdProps {
  children: React.ReactNode;
  utenScroll?: boolean;
}

export default function SideInnhold({
  children,
  utenScroll,
}: SideInnholdProps) {
  if (utenScroll) {
    return <div className={'pt-5 px-5'}>{children}</div>;
  }
  return (
    <SideScroll>
      <div className={'pt-5 px-5'}>{children}</div>
    </SideScroll>
  );
}
