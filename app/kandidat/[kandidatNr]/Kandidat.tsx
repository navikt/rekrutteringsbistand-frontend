'use client';

import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import { FC } from 'react';

export interface KandidatProps {
  kandidatNr: string;
}

const Kandidat: FC<KandidatProps> = ({ kandidatNr }) => {
  return (
    <>
      <VisKandidat kandidatnr={kandidatNr} />
    </>
  );
};

export default Kandidat;
