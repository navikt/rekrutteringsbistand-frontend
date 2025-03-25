'use client';

import Hurtiglenker from './components/Hurtiglenker';
import Statistikk from './components/Statistikk';
import * as React from 'react';

const Forside: React.FC = () => {
  return (
    <div className='w-full'>
      <div className='mt-4'>
        <Hurtiglenker />
      </div>
      <div className='mt-8'>
        <Statistikk />
      </div>
    </div>
  );
};

export default Forside;
