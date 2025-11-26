'use client';

import { useKandidatnummer } from '@/app/api/rekrutteringstreff/[...slug]/utils/useKandidatnummer';
import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatsideLayout';
import KandidatOversikt from '@/app/kandidat/[kandidatNr]/vis-kandidat/oversikt-fane/KandidatOversikt';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import SWRLaster from '@/components/SWRLaster';
import { FC } from 'react';

export interface VisPersonProps {
  personTreffId?: string;
  rekrutteringstreffId?: string;
}

const VisPerson: FC<VisPersonProps> = ({ personTreffId, rekrutteringstreffId }) => {
  const kandidatnummerHook = useKandidatnummer(personTreffId || null, rekrutteringstreffId || null);

  return (
    <SWRLaster hooks={[kandidatnummerHook]} allowPartialData>
      {(kandidatnummerData) =>
        kandidatnummerData.kandidatnummer ? (
          <KandidatContextProvider
            kandidatId={kandidatnummerData.kandidatnummer}
          >
            <KandidatSideLayout>
              <div className='@container/kandidat-knapper contain-layout'>
                <div className='my-4'>
                  <NavigerTilAktivitetsplanenKnapp />
                </div>
              </div>
            </KandidatSideLayout>
            <KandidatOversikt />
          </KandidatContextProvider>
        ) : (
          <div> Personen er ikke i kandidatsøk </div>
        )
      }
    </SWRLaster>
  );
};

export default VisPerson;
