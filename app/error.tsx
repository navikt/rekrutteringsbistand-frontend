'use client';

import { logger } from '@navikt/next-logger';
import { useEffect } from 'react';
import Feilmelding from './components/feilhåndtering/Feilmelding';
import TilbakeKnapp from './components/layout/TilbakeKnapp';

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

    logger.error('Error', error);
  }, [error]);

  return (
    <div className='space-y-4'>
      <TilbakeKnapp />
      <h2 className='text-2xl font-semibold'>Ojsann!</h2>

      <Feilmelding stack={error.stack} beskrivelse={error.message} />
    </div>
  );
}
