'use client';

import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const TilbakeKnapp: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const tilbake = () => {
    // Del opp URL-stien og fjern siste segment

    if (segments.length <= 1) {
      // Hvis vi er på root-nivå, gå til en spesifikk side eller bruk router.back()
      router.push('/');
      return;
    }

    segments.pop(); // Fjern siste segment
    const parentPath = segments.join('/') || '/';

    router.push(parentPath);
  };

  const tilbakeKnappNavn = () => {
    const segmentNavn = segments[segments.length - 2] || 'forsiden';

    switch (segmentNavn) {
      case 'kandidat':
        return 'til kandidatsøk';
      case 'stilling':
        return 'til stillingssøk';
      case 'formidling':
        return 'til etterregistreringer';
      default:
        return null;
    }
  };
  return (
    <Button
      size='small'
      icon={<ArrowLeftIcon />}
      onClick={tilbake}
      variant='tertiary'
    >
      Tilbake {tilbakeKnappNavn()}
    </Button>
  );
};

export default TilbakeKnapp;
