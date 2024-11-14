import parse from 'html-react-parser';
import * as React from 'react';
import { useStillingsContext } from '../StillingsContext';

const StillingsTekst: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const tekst = stillingsData.stilling?.properties?.adtext ?? '';

  return <>{parse(tekst)}</>;
};

export default StillingsTekst;
