'use client';

import './globals.css';
import { rapporterFeil } from '@/util/apm';
import {
  erChunkfeil,
  lastPåNyttVedChunkfeil,
} from '@/util/lastPåNyttVedChunkfeil';
import { Button, Heading } from '@navikt/ds-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    if (erChunkfeil(error)) {
      lastPåNyttVedChunkfeil(error);
      return;
    }
    rapporterFeil(error);
  }, [error]);

  return (
    <html lang='no'>
      <body className='p-8'>
        <Heading level='1' size='large' spacing>
          Noe gikk galt
        </Heading>
        <Button onClick={retry}>Pr&oslash;v igjen</Button>
      </body>
    </html>
  );
}
