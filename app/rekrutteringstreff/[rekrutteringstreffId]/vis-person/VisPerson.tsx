'use client';

import SWRLaster from '../../../components/SWRLaster';
import VisKandidat from '../../../kandidat/vis-kandidat/VisKandidat';
import { useKandidatnummer } from '@/app/api/rekrutteringstreff/[...slug]/useKandidatnummer';
import * as React from 'react';

export interface VisPersonProps {
  personTreffId?: string;
}

const VisPerson: React.FC<VisPersonProps> = ({ personTreffId }) => {
  const kandidatnummerHook = useKandidatnummer(personTreffId || null);

  return (
    <SWRLaster hooks={[kandidatnummerHook]} allowPartialData>
      {(kandidatnummerData) =>
        kandidatnummerData.kandidatnummer ? (
          <VisKandidat kandidatnr={kandidatnummerData.kandidatnummer} />
        ) : (
          <div> Personen er ikke i kandidatsøk </div>
        )
      }
    </SWRLaster>
  );
};

export default VisPerson;
