'use client';

import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

export interface TilbakeKnappProps {
  href?: string;
  navn?: string;
}

const TilbakeKnapp: React.FC<TilbakeKnappProps> = ({ href, navn }) => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const tilbake = () => {
    // Del opp URL-stien og fjern siste segment

    if (href) {
      router.push(href);
      return;
    } else if (segments.length <= 1) {
      // Hvis vi er på root-nivå, gå til en spesifikk side eller bruk router.back()
      router.push('/');
      return;
    }

    segments.pop(); // Fjern siste segment
    const parentPath = segments.join('/') || '/';

    router.push(parentPath);
  };

  return (
    <Button
      size='small'
      icon={<ArrowLeftIcon />}
      onClick={tilbake}
      variant='tertiary'
    >
      {navn ? navn : 'Tilbake'}
    </Button>
  );
};

export default TilbakeKnapp;
