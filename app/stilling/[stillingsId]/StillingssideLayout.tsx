'use client';

import HovedInnholdKort from '../../components/layout/HovedInnholdKort';
import LayoutMedSidebar from '../../components/layout/LayoutMedSidebar';
import SideLayout from '../../components/layout/SideLayout';
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

  const [visKandidatnr] = useQueryState('visKandidat', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const ugyldigStilling =
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  return (
    <LayoutMedSidebar
      sidebar={visKandidatnr && <VisKandidat kandidatnr={visKandidatnr} />}
    >
      <HovedInnholdKort>
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
      </HovedInnholdKort>
    </LayoutMedSidebar>
  );
};

export default StillingSideLayout;
