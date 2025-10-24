'use client';

import KandidatHandlingerForStilling from './KandidatHandlingerForStilling';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { Alert, Box } from '@navikt/ds-react';

export interface KandidatIKandidatlisteProps {
  kandidatlisteKandidat: string;
}

export default function KandidatIKandidatliste({
  kandidatlisteKandidat,
}: KandidatIKandidatlisteProps) {
  const { kandidater } = useKandidatlisteContext();

  const kandidat = kandidater.find(
    (k) => k.kandidatnr === kandidatlisteKandidat,
  );

  if (!kandidat) {
    return (
      <div className='py-5'>
        <Alert variant='error'>Fant ikke kandidat i kandidatliste</Alert>
      </div>
    );
  }

  return (
    <Box.New
      padding='5'
      className='mt-5'
      background='sunken'
      borderRadius={'large'}
    >
      <KandidatHandlingerForStilling kandidat={kandidat} />
    </Box.New>
  );
}
