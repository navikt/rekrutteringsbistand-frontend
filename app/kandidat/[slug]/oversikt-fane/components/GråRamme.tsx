import * as React from 'react';

export interface GråRammeProps {
  children?: React.ReactNode | undefined;
}

const GråRamme: React.FC<GråRammeProps> = ({ children }) => {
  return (
    <div className='p-4 rounded-xl border border-[rgba(7,26,54,0.21)]'>
      {children}
    </div>
  );
};

export default GråRamme;
