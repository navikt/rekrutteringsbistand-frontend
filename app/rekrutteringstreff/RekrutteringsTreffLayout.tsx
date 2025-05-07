'use client';

import KandidatSplitScreenLayout from '../components/layout/KandidatSplitScreenLayout';
import VisKandidat from '../kandidat/VisKandidat/VisKandidat';
import { useQueryState } from 'nuqs';
import * as React from 'react';

export interface RekrutteringsTreffLayoutProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringsTreffLayout: React.FC<RekrutteringsTreffLayoutProps> = ({
  children,
}) => {
  const [visKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  return (
    <KandidatSplitScreenLayout
      sidebar={visKandidatnr && <VisKandidat kandidatnr={visKandidatnr} />}
    >
      {children}
    </KandidatSplitScreenLayout>
  );
};

export default RekrutteringsTreffLayout;
