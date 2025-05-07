'use client';

import Feilmelding from './components/feilhåndtering/Feilmelding';
import { Button } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  const router = useRouter();
  return (
    <div className='space-y-4'>
      <Button
        size='small'
        icon={<ArrowLeftIcon />}
        onClick={() => router.back()}
        variant='tertiary'
      >
        Tilbake
      </Button>
      <h2 className='text-2xl font-semibold'>Ojsann!</h2>
      <Feilmelding stack={error.stack} beskrivelse={error.message} />
    </div>
  );
}
