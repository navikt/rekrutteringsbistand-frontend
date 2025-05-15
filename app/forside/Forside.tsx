'use client';

import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import Statistikk from './components/Statistikk';
import * as React from 'react';

const Forside: React.FC = () => {
  return (
    <HovedInnholdKort>
      <div className='mt-8'>
        <Statistikk />
      </div>
    </HovedInnholdKort>
  );
};

export default Forside;
