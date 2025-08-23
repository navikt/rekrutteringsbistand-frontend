'use client';

import Statistikk from './_ui/Statistikk';
import HovedInnholdKort from '@/components/layout/HovedInnholdKort';
import RekBisKort from '@/components/layout/RekBisKort';
import * as React from 'react';

const Forside: React.FC = () => {
  return (
    <HovedInnholdKort>
      <RekBisKort>
        <div className='mt-8'>
          <Statistikk />
        </div>
      </RekBisKort>
    </HovedInnholdKort>
  );
};

export default Forside;
