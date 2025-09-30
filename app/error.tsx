'use client';

import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { Button } from '@navikt/ds-react';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    const isAuthError = error instanceof Response && error.status === 401;
    const isWonderwallCookieError =
      error.message?.includes('wonderwall') ||
      error.message?.includes('callback') ||
      error.message?.includes('cookie');

    if (isAuthError || isWonderwallCookieError) {
      // Clear potential stale cookies before redirecting
      document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=');
        const name =
          eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        if (name.includes('wonderwall') || name.includes('oauth')) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
      });

      window.location.href = `/oauth2/login?redirect=${
        window.location.pathname
      }`;
    }
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
      <Feilmelding error={error} message={error.message} />
    </div>
  );
}
