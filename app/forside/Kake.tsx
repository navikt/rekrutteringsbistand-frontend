import * as React from 'react';

export interface IKake {
  children?: React.ReactNode | undefined;
}

const Kake: React.FC<IKake> = ({ children }) => {
  return <div className='flex flex-col mt-2 absolute' > </div>
};

export default Kake;