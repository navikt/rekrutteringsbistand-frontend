import * as React from 'react';
import StillingsSøk from '../../../stillings-sok/StillingsSøk';
import { useKandidatContext } from '../KandidatContext';

const KandidatForslagTilStilling: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  return <StillingsSøk skjulBanner kandidatId={kandidatId} />;
};

export default KandidatForslagTilStilling;
