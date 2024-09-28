import parse from 'html-react-parser';
import * as React from 'react';
import RikTekstEditor from '../../../../components/rikteksteditor/RikTekstEditor';
import { useStillingsContext } from '../StillingsContext';

const StillingsTekst: React.FC = () => {
  const { stillingsData, erEier, endrerStilling } = useStillingsContext();
  const tekst = stillingsData.stilling?.properties?.adtext ?? '';

  if (!erEier || !endrerStilling) {
    return <>{parse(tekst)}</>;
  }
  return (
    <RikTekstEditor
      id='endre-stilling-annonsetekst'
      tekst={tekst ?? ''}
      onChange={(t) => console.log('🎺 t', t)}
      // feilMelding={errors.adText}
    />
  );
};

export default StillingsTekst;
