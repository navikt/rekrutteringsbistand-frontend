'use client';

import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { rapporterFeil } from '@/util/apm';
import { lastPåNyttVedChunkfeil } from '@/util/lastPåNyttVedChunkfeil';
import { Button, Heading } from '@navikt/ds-react';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (lastPåNyttVedChunkfeil(error)) return;
    const isAuthError =
      error.message?.includes('401') ||
      error.message?.includes('Ikke autorisert');
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

      const loginUrl = new URL('/oauth2/login', window.location.origin);
      loginUrl.searchParams.set(
        'redirect',
        window.location.pathname + window.location.search,
      );
      window.location.href = loginUrl.href;
      return;
    }
    rapporterFeil(error);
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
      <Heading level='2' size='large'>
        Ojsann!
      </Heading>
      <Feilmelding error={error} message={error.message} />
    </div>
  );
}
