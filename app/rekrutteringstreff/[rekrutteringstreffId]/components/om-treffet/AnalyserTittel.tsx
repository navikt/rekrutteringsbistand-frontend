'use client';

import { ValiderRekrutteringstreffResponsDto } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import { Alert, BodyLong, BodyShort, Label, Loader } from '@navikt/ds-react';
import React from 'react';

export interface AnalyserTittelProps {
  tittel: string;
  isLoadingAnalyse: boolean;
  analyseData?: ValiderRekrutteringstreffResponsDto;
  analyseError?: Error;
}

const AnalyserTittel: React.FC<AnalyserTittelProps> = ({
  tittel,
  isLoadingAnalyse,
  analyseData,
  analyseError,
}) => (
  <div className='space-y-4'>
    <div>
      <Label>Tittel som analyseres:</Label>
      <BodyLong>{tittel}</BodyLong>
    </div>

    {isLoadingAnalyse && (
      <div className='flex justify-center my-4'>
        <Loader size='xlarge' title='Validerer tittel...' />
      </div>
    )}

    {analyseError && !isLoadingAnalyse && (
      <Alert variant='error'>
        {analyseError.message ||
          'En feil oppstod under validering av tittelen.'}
      </Alert>
    )}

    {analyseData && !isLoadingAnalyse && !analyseError && (
      <div>
        <Label className='mb-2 block'>Resultat av analyse:</Label>
        {analyseData.bryterRetningslinjer ? (
          <Alert variant='warning'>
            <BodyShort weight='semibold'>
              Tittelen bryter med retningslinjer.
            </BodyShort>
            <BodyLong>{analyseData.begrunnelse}</BodyLong>
          </Alert>
        ) : (
          <Alert variant='success'>
            <BodyShort weight='semibold'>Tittelen ser grei ut.</BodyShort>
            <BodyLong>{analyseData.begrunnelse}</BodyLong>
          </Alert>
        )}
      </div>
    )}
    {!isLoadingAnalyse && !analyseData && !analyseError && !tittel && (
      <Alert variant='info'>Ingen tittel å analysere.</Alert>
    )}
  </div>
);

export default AnalyserTittel;
