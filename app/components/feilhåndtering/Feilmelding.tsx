import { Alert, BodyLong, Button } from '@navikt/ds-react';
import * as React from 'react';

export interface IFeilmelding {
  statuskode?: number;
  tittel?: string;
  stack?: string;
  beskrivelse?: string;
  url?: string;
}

const Feilmelding: React.FC<IFeilmelding> = ({
  tittel,
  statuskode,
  stack,
  beskrivelse,
  url,
}) => {
  const [showError, setShowError] = React.useState(false);
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
