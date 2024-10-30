'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

const TilbakeKnapp: React.FC = () => {
  const router = useRouter();
  const tilbake = () => router.back();
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
