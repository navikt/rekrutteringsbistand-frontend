'use client';

import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const TilbakeKnapp: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tilbake = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        try {
          const previousPageInSameDomain =
            document.referrer &&
            new URL(document.referrer).origin === window.location.origin;

          if (previousPageInSameDomain) {
            router.back();
            return;
          }
        } catch {}
      }

      const pathSegments = pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        pathSegments.pop();
        const parentPath =
          pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}`;
        router.push(parentPath);
      } else {
        router.push('/');
      }
    } else {
      const pathSegments = pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        pathSegments.pop();
        const parentPath =
          pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}`;
        router.push(parentPath);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <Button
      size='small'
      icon={<ArrowLeftIcon />}
      onClick={tilbake}
      variant='tertiary'
    >
      Tilbake
    </Button>
  );
};

export default TilbakeKnapp;
