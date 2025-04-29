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
    <HvitKort className={className ?? 'w-full'}>
      <main className='mx-auto w-full min-w[320px] max-w-[1440px]'>
        {children}
      </main>
    </HvitKort>
  );
};

export default HovedInnholdKort;
