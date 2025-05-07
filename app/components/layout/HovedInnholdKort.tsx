import HvitKort from './HvitKort';
import * as React from 'react';

export interface HovedInnholdKortProps {
  children?: React.ReactNode | undefined;
  className?: string;
}

const HovedInnholdKort: React.FC<HovedInnholdKortProps> = ({
  children,
  className,
}) => {
  return (
    <main className='w-full h-full'>
      <HvitKort className={className ?? 'w-full'}>{children}</HvitKort>
    </main>
  );
};

export default HovedInnholdKort;
