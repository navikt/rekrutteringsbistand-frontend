import StillingInkludering from './StillingInkludering';
import StillingSidebarKnapper from './StillingSidebarKnapper';
import { FC } from 'react';

interface StillingSidebarKnapperProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const StillingSidebar: FC<StillingSidebarKnapperProps> = ({ printRef }) => {
  return (
    <aside className='sidebar w-full flex-grow-0 md:w-[26rem]'>
      <StillingSidebarKnapper printRef={printRef} />
      <StillingInkludering />
    </aside>
  );
};

export default StillingSidebar;
