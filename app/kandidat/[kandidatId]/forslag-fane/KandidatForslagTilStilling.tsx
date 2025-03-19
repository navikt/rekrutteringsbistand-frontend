import StillingsSøk from '../../../stilling/StillingsSøk';
import { useKandidatContext } from '../KandidatContext';
import * as React from 'react';

const KandidatForslagTilStilling: React.FC = () => {
  const { kandidatId } = useKandidatContext();

  return <StillingsSøk skjulBanner kandidatId={kandidatId} />;
};

export default KandidatForslagTilStilling;
