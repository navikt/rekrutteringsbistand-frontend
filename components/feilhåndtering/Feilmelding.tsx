import { SESJON_UTLØPT_MELDING } from '@/app/api/fetcher';
import { RekbisError } from '@/util/rekbisError';
import { Alert, BodyShort, Button, CopyButton } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ZodError } from 'zod';

const SesjonUtløpt: React.FC = () => {
  const pathname = usePathname();
  const søkeparametere = useSearchParams().toString();
  const redirect = søkeparametere ? `${pathname}?${søkeparametere}` : pathname;
  const loginUrl = `/oauth2/login?${new URLSearchParams({ redirect })}`;

  return (
    <Alert style={{ margin: '1rem' }} variant='warning'>
      <BodyShort className='font-bold'>{SESJON_UTLØPT_MELDING}</BodyShort>
      <BodyShort>
        Innloggingen din har utløpt. Logg inn på nytt for å fortsette der du
        var.
      </BodyShort>
      <Button as='a' href={loginUrl} size='small' className='mt-4'>
        Logg inn på nytt
      </Button>
    </Alert>
  );
};

export interface IFeilmelding {
  error?: RekbisError | unknown;
  zodError?: ZodError;
  message?: string;
}

const Feilmelding: React.FC<IFeilmelding> = ({ zodError, error, message }) => {
  const [showError, setShowError] = useState(false);

  // Log error hvis ikke rekbisError
  useEffect(() => {
    if (error) {
      if (error instanceof RekbisError) {
        const erNettverksfeil = error.message.startsWith('Nettverksfeil');
        const loggData = {
          operationId: error.feilkode,
          errorType: 'RekbisError',
        };
        const loggMelding = 'Error vist i UI: ' + (error.message || message);
        // Kall metodene direkte på logger: pino krever riktig `this`
        if (erNettverksfeil) {
          logger.info(loggData, loggMelding);
        } else {
          logger.warn(loggData, loggMelding);
        }
      } else {
        logger.error(
          {
            err: error instanceof Error ? error : null,
            errorType: error?.constructor?.name || typeof error,
          },
          `Error displayed in UI (${message})`,
        );
      }
    }
  }, [error, message]);

  if (zodError) {
    logger.info({ zodError: zodError }, 'ZodError');
    return (
      <Alert className='w-full' style={{ margin: '1rem' }} variant='error'>
        <strong>Feil ved validering av data (ZodError)</strong>
        <BodyShort>Antall feil {zodError?.issues.length ?? 'N/A'}</BodyShort>
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
            {zodError?.issues?.map((e, i) => (
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

  if (error instanceof RekbisError && error.statuskode === 401) {
    return <SesjonUtløpt />;
  }

  if (error instanceof RekbisError) {
    return (
      <div style={{ width: '100%' }}>
        <Alert style={{ margin: '1rem' }} variant='error'>
          <BodyShort className='font-bold'>Noe gikk galt!</BodyShort>

          {error.feilkode && (
            <dl className='my-4'>
              <dt className='font-bold italic'>
                Feilkode for rapportering av feil:
              </dt>
              <dd className='ml-4 flex items-center'>
                {error.feilkode}{' '}
                <CopyButton className='ml-2' copyText={error.feilkode} />
              </dd>
            </dl>
          )}
          <BodyShort className='font-bold'>
            {error.message || 'Ukjent feil'}
          </BodyShort>
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
              <dd className='mb-4 ml-4'>{error.details ?? error.stack}</dd>
            </dl>
          )}
        </Alert>
      </div>
    );
  }

  return (
    <Alert style={{ margin: '1rem' }} variant='error'>
      <BodyShort className='font-bold'>Noe gikk galt!</BodyShort>
      <BodyShort>
        {message ??
          'Ukjent feil ikke håndtert. Rapporter inn via fagsystemsak.'}
      </BodyShort>
    </Alert>
  );
};

export default Feilmelding;
