'use client';

import { logger } from '@navikt/next-logger';
import { useEffect } from 'react';
import Feilmelding from './components/feilhåndtering/Feilmelding';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (error instanceof Response && error.status === 401) {
      window.location.href = `/oauth2/login?redirect=${
        window.location.pathname
      }`;
    }
  }, [error]);

  logger.error('Error', error);
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold'>Ojsann!</h2>
      <Feilmelding
        stack={error.stack}
        beskrivelse={error.message}
        tittel='Uventet feil'
      />
    </div>
  );
}
