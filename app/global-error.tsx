'use client';

import './globals.css';
import { rapporterFeil } from '@/util/apm';
import { Button, Heading } from '@navikt/ds-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    rapporterFeil(error);
  }, [error]);

  return (
    <html lang='no'>
      <body className='p-8'>
        <Heading level='1' size='large' spacing>
          Noe gikk galt
        </Heading>
        <Button onClick={reset}>Pr&oslash;v igjen</Button>
      </body>
    </html>
  );
}
