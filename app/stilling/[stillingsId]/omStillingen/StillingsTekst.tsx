import { useStillingsContext } from '../StillingsContext';
import parse from 'html-react-parser';
import * as React from 'react';

const StillingsTekst: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const tekst = stillingsData.stilling?.properties?.adtext ?? '';

  return <>{parse(tekst)}</>;
};

export default StillingsTekst;
