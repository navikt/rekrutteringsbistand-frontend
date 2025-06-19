import { RekbisError } from '../../../util/rekbisError';
import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  CopyButton,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';
import { ZodError } from 'zod';

export interface IFeilmelding {
  zodError?: ZodError;
  tittel?: string;
  stack?: string;
  beskrivelse?: string;
  error?: unknown;
  feilkode?: string;
  url?: string;
}

const Feilmelding: React.FC<IFeilmelding> = ({
  zodError,
  stack,
  beskrivelse,
  error,
  tittel = 'Ukjent feil',
  feilkode,
}) => {
  const [showError, setShowError] = React.useState(false);

  // Log error hvis ikke rekbisError
  React.useEffect(() => {
    if (error) {
      if (error instanceof RekbisError) {
        logger.error(
          {
            operationId: error.feilkode,
            errorType: 'RekbisError',
          },
          'Error displayed in UI: ' + error.beskrivelse,
        );
      } else {
        logger.error(
          {
            err: error instanceof Error ? error : null,
            errorType: error?.constructor?.name || typeof error,
            context: 'Feilmelding component',
          },
          'Error displayed in UI (original error)',
        );
      }
    }
  }, [error]);

  if (zodError) {
    logger.info('ZodError', zodError);
    return (
      <Alert className='w-full' style={{ margin: '1rem' }} variant='error'>
        <strong>Feil ved validering av data (ZodError)</strong>
        <BodyLong>{tittel}</BodyLong>
        <BodyShort>Antall feil {zodError?.errors.length ?? 'N/A'}</BodyShort>
        <Button
          className='mt-4 mb-4'
          size='small'
          variant={showError ? 'secondary-neutral' : 'secondary'}
          onClick={() => setShowError(!showError)}
        >
          {showError ? 'Skjul' : 'Vis'} detaljert feilmelding
        </Button>
        {showError && (
          <div>
            {zodError?.errors?.map((e, i) => (
              <div key={i} className='mb-2'>
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
      <Alert style={{ margin: '1rem' }} variant='error'>
        <BodyShort className='font-bold'>Noe gikk galt!</BodyShort>

        {feilkode && (
          <dl className='my-4'>
            <dt className='font-bold italic'>
              Feilkode for rapportering av feil:
            </dt>
            <dd className='ml-4'>
              {feilkode} <CopyButton className='ml-2' copyText={feilkode} />;
            </dd>
          </dl>
        )}
        <BodyShort className='font-bold'>{tittel || 'Ukjent feil'}</BodyShort>
        <BodyLong>{beskrivelse}</BodyLong>
        <Button
          className='mt-4 mb-4'
          size='small'
          variant={showError ? 'secondary-neutral' : 'secondary'}
          onClick={() => setShowError(!showError)}
        >
          {showError ? 'Skjul' : 'Vis'} detaljert feilmelding
        </Button>
        {showError && (
          <dl>
            <dt className='font-bold italic'>Teknisk feilmelding</dt>
            <dd className='mb-4 ml-4'>{stack ?? '-'}</dd>
          </dl>
        )}
      </Alert>
    </div>
  );
};

export default Feilmelding;
