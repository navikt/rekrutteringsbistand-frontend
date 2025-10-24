import * as React from 'react';

export interface WindowHeaderProps {
  children?: React.ReactNode | undefined;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({ children }) => {
  return (
    <div className={'flex'}>
      <div>{children} </div>
    </div>
  );
};

export default WindowHeader;
