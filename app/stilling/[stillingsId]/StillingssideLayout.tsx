'use client';

import SideLayout from '../../components/layout/SideLayout';
import { SplitScreenLayout } from '../../components/layout/SplitScreenLayout';
import StillingHeader from './StillingHeader';
import { useStillingsContext } from './StillingsContext';
import { Alert, Heading } from '@navikt/ds-react';
import * as React from 'react';

interface StillingSideLayoutProps {
  children?: React.ReactNode;
}

const StillingSideLayout: React.FC<StillingSideLayoutProps> = ({
  children,
}) => {
  const { stillingsData } = useStillingsContext();

  const ugyldigStilling =
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  return (
    <SplitScreenLayout>
      <SideLayout banner={<StillingHeader />}>
        {ugyldigStilling ? (
          <Alert variant='error'>
            <Heading spacing size='small' level='3'>
              Ugyldig stilling
            </Heading>
            <p>
              Denne stillingen er ikke gyldig da det er en intern stilling som
              mangler organisasjonsnummer.
            </p>
            <p> Stillingen er derfor ikke tilgjengelig for rekruttering.</p>
          </Alert>
        ) : (
          children
        )}
      </SideLayout>
    </SplitScreenLayout>
  );
};

export default StillingSideLayout;
