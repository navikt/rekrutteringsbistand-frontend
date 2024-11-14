import * as React from 'react';
import StillingInkludering from './StillingInkludering';
import StillingSidebarKnapper from './StillingSidebarKnapper';
interface StillingSidebarKnapperProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const StillingSidebar: React.FC<StillingSidebarKnapperProps> = ({
  printRef,
}) => {
  return (
    <aside className='sidebar flex-grow-0 w-full md:w-[26rem]'>
      <StillingSidebarKnapper printRef={printRef} />
      <StillingInkludering />
    </aside>
  );
};

export default StillingSidebar;
