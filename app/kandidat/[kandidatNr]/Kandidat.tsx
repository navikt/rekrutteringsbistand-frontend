'use client';

import WindowFinnStillingForKandidat from '@/app/_windows/finn-stilling-window/WindowFinnStillingForKandidat';
import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import * as React from 'react';

export interface KandidatProps {
  kandidatNr: string;
}

const Kandidat: React.FC<KandidatProps> = ({ kandidatNr }) => {
  return (
    <>
      <VisKandidat kandidatnr={kandidatNr} />
      <WindowFinnStillingForKandidat kandidatNr={kandidatNr} />
    </>
  );
};

export default Kandidat;
