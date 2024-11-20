import * as React from 'react';
import StillingsSøk from '../../../stillings-sok/StillingsSøk';
import { useKandidatContext } from '../KandidatContext';

const KandidatForslagTilStilling: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  return (
    <React.Fragment>
      <StillingsSøk skjulBanner kandidatId={kandidatId} />
    </React.Fragment>
  );
};

export default KandidatForslagTilStilling;
