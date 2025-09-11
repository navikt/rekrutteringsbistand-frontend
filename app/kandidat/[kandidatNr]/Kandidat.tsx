'use client';

import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';

export interface KandidatProps {
  kandidatNr: string;
}

const Kandidat: React.FC<KandidatProps> = ({ kandidatNr }) => {
  return (
    <>
      <VisKandidat kandidatnr={kandidatNr} />
    </>
  );
};

export default Kandidat;
