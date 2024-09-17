import * as React from 'react';
import StillingStatus from '../../components/StillingStatus';
import StillingInkludering from './StillingInkludering';
import StillingSidebarKnapper from './StillingSidebarKnapper';
export interface IStillingSidebar {
  children?: React.ReactNode | undefined;
}

const StillingSidebar: React.FC<IStillingSidebar> = ({ children }) => {
  return (
    <aside className='sidebar flex-grow-0 w-full md:w-[26rem]'>
      <div className='mb-4'>
        <StillingStatus />
      </div>
      <StillingSidebarKnapper />
      <StillingInkludering />
    </aside>
  );
};

export default StillingSidebar;
