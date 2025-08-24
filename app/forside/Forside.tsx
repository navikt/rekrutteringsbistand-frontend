'use client';

import Statistikk from './_ui/Statistikk';
import RekBisKort from '@/components/layout/RekBisKort';
import * as React from 'react';

const Forside: React.FC = () => {
  return (
    <RekBisKort>
      <div className='mt-8'>
        <Statistikk />
      </div>
    </RekBisKort>
  );
};

export default Forside;
