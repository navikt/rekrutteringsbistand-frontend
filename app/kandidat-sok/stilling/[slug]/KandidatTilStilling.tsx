import * as React from 'react';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Sidelaster from '../../../components/Sidelaster';
import KandidatSøk from '../../page';
import { useFinnKandidatForStilling } from './useFinnKandidatForStilling';

export interface KandidatTilStillingProps {
  stillingsData?: StillingsDataDTO;
}

const KandidatTilStilling: React.FC<KandidatTilStillingProps> = ({
  stillingsData,
}) => {
  const { isLoading } = useFinnKandidatForStilling(stillingsData);

  if (isLoading) {
    return <Sidelaster />;
  }
  return <KandidatSøk />;
};

export default KandidatTilStilling;
