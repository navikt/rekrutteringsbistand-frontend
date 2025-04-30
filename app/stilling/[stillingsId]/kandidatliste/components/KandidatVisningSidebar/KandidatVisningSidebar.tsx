import { useKandidatlisteContext } from '../../KandidatlisteContext';
import KandidatHandlingerForStilling from './KandidatHandlingerForStilling';
import * as React from 'react';

export interface KandidatVisningSidebarProps {
  kandidatnr: string;
}

const KandidatVisningSidebar: React.FC<KandidatVisningSidebarProps> = ({
  kandidatnr,
}) => {
  const { kandidater } = useKandidatlisteContext();

  const kandidat = kandidater.find((k) => k.kandidatnr === kandidatnr);

  if (!kandidat) {
    return null;
  }

  return <KandidatHandlingerForStilling kandidat={kandidat} />;
};

export default KandidatVisningSidebar;
