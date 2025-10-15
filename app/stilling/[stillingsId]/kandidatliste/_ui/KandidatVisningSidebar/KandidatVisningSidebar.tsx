import KandidatHandlingerForStilling from './KandidatHandlingerForStilling';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { FC } from 'react';

export interface KandidatVisningSidebarProps {
  kandidatnr: string;
}

const KandidatVisningSidebar: FC<KandidatVisningSidebarProps> = ({
  kandidatnr,
}) => {
  const { kandidater } = useKandidatlisteContext();

  const kandidat = kandidater.find((k) => k.kandidatnr === kandidatnr);

  if (!kandidat) {
    return <div>Fant ikke kandidat i kandidatliste</div>;
  }

  return <KandidatHandlingerForStilling kandidat={kandidat} />;
};

export default KandidatVisningSidebar;
