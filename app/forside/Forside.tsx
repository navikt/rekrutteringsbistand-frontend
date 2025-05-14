'use client';

import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import Statistikk from './components/Statistikk';
import * as React from 'react';

const Forside: React.FC = () => {
  return (
    <HovedInnholdKort>
      <Statistikk />

      <div>
        Survey:
        {/* @ts-expect-error ikke typet */}
        <skyra-survey
          className='w-full h-full'
          slug='arbeids-og-velferdsetaten-nav/oversikt'
        >
          {/* @ts-expect-error ikke typet */}
        </skyra-survey>
      </div>
    </HovedInnholdKort>
  );
};

export default Forside;
