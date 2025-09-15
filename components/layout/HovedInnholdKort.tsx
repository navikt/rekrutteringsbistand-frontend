import { ScrollArea } from '@/components/ui/scroll-area';
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
    <main className='w-full '>
      <ScrollArea className={`h-[calc(100vh-4rem)] pr-4 ${className ?? ''}`}>
        {children}
      </ScrollArea>
    </main>
  );
};

export default HovedInnholdKort;
