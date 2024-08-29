import { Alert, BodyLong, Button } from '@navikt/ds-react';
import * as React from 'react';
import { IFeilmelding } from '../../types/Feilmelding';

const Feilmelding: React.FC<IFeilmelding> = ({
  zodError,
  tittel,
  statuskode,
  stack,
  beskrivelse,
  url,
}) => {
  const [showError, setShowError] = React.useState(false);

  if (zodError) {
    return (
      <Alert variant='error' style={{ margin: '1rem' }} className='w-full'>
        <strong>Feil ved validering av data (ZodError)</strong>
        <BodyLong>{tittel}</BodyLong>
        <p>Antall feil {zodError?.errors.length ?? 'N/A'}</p>
        <Button
          className='mt-4 mb-4'
          variant={showError ? 'secondary-neutral' : 'secondary'}
          size='small'
          onClick={() => setShowError(!showError)}
        >
          {showError ? 'Skjul' : 'Vis'} detaljert feilmelding
        </Button>
        {showError && (
          <div>
            {zodError?.errors?.map((e) => (
              <div className='mb-2'>
                <dd>
                  <strong>{e.code}:</strong> {e.message}
                </dd>
                <dt>
                  <strong>Path:</strong>{' '}
                  {e.path && <span> {e.path.join('.')}</span>}
                </dt>
              </div>
            ))}
          </div>
        )}
      </Alert>
    );
  }
  return (
    <div style={{ width: '100%' }}>
      <Alert variant='error' style={{ margin: '1rem' }}>
        <strong>Noe gikk galt!</strong>
        <BodyLong>{tittel}</BodyLong>
        <p>{beskrivelse}</p>
        <Button
          className='mt-4 mb-4'
          variant={showError ? 'secondary-neutral' : 'secondary'}
          size='small'
          onClick={() => setShowError(!showError)}
        >
          {showError ? 'Skjul' : 'Vis'} detaljert feilmelding
        </Button>
        {showError && (
          <dl>
            <dt className='font-bold italic'>Statuskode</dt>
            <dd className='mb-4 ml-4'>{statuskode ?? '-'}</dd>

            <dt className='font-bold italic'>URL</dt>
            <dd className='mb-4 ml-4'>{url ?? '-'}</dd>

            <dt className='font-bold italic'>Teknisk feilmelding</dt>
            <dd className='mb-4 ml-4'>{stack ?? '-'}</dd>
          </dl>
        )}
      </Alert>
    </div>
  );
};

export default Feilmelding;
