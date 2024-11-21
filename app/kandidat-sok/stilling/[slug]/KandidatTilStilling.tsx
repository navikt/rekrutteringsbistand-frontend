import * as React from 'react';
import { geografiDTO } from '../../../api/stilling/geografi/useGeografi';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Sidelaster from '../../../components/Sidelaster';
import KandidatSøk from '../../page';
import { hentØnskerFraStilling } from './hentØnskerFraStilling';

export interface KandidatTilStillingProps {
  stillingsData?: StillingsDataDTO;
}

const KandidatTilStilling: React.FC<KandidatTilStillingProps> = ({
  stillingsData,
}) => {
  const { isLoading } = hentØnskerFraStilling(stillingsData);

  if (isLoading) {
    return <Sidelaster />;
  }
  return <KandidatSøk />;
};

export default KandidatTilStilling;
