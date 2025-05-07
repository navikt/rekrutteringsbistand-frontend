'use client';

import SplitScreenLayout from '../../components/layout/KandidatSplitScreenLayout';
import SideLayout from '../../components/layout/SideLayout';
import SideNavigasjon from '../../components/layout/SideNavigasjon';
import VisKandidat from '../../kandidat/VisKandidat/VisKandidat';
import StillingHeader from './StillingHeader';
import { useStillingsContext } from './StillingsContext';
import { Alert, Heading } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';

interface StillingSideLayoutProps {
  children?: React.ReactNode;
}

const StillingSideLayout: React.FC<StillingSideLayoutProps> = ({
  children,
}) => {
  const { stillingsData } = useStillingsContext();

  const [visKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const ugyldigStilling =
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  return (
    <SplitScreenLayout
      sidebar={visKandidatnr && <VisKandidat kandidatnr={visKandidatnr} />}
    >
      <SideLayout
        banner={<StillingHeader />}
        navigasjon={<SideNavigasjon tilbakeurl='/stilling' />}
      >
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
