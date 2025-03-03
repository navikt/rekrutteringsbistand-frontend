'use client';

import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

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
