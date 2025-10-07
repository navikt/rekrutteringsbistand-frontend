'use client';

import { useKandidatnummer } from '@/app/api/rekrutteringstreff/[...slug]/utils/useKandidatnummer';
import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import SWRLaster from '@/components/SWRLaster';
import { FC } from 'react';

export interface VisPersonProps {
  personTreffId?: string;
}

const VisPerson: FC<VisPersonProps> = ({ personTreffId }) => {
  const kandidatnummerHook = useKandidatnummer(personTreffId || null);

  return (
    <SWRLaster hooks={[kandidatnummerHook]} allowPartialData>
      {(kandidatnummerData) =>
        kandidatnummerData.kandidatnummer ? (
          <KandidatContextProvider
            kandidatId={kandidatnummerData.kandidatnummer}
          >
            <VisKandidat />
          </KandidatContextProvider>
        ) : (
          <div> Personen er ikke i kandidatsøk </div>
        )
      }
    </SWRLaster>
  );
};

export default VisPerson;
