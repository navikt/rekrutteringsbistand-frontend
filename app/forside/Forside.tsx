'use client';

import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import Statistikk from './components/Statistikk';
import * as React from 'react';

const Forside: React.FC = () => {
  return (
    <HovedInnholdKort>
      <Statistikk />
    </HovedInnholdKort>
  );
};

export default Forside;
