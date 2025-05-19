import { useStilling } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import SWRLaster from '../../../components/SWRLaster';
import { Link } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatlisteTittelProps {
  stillingsId: string;
}

const KandidatlisteTittel: React.FC<KandidatlisteTittelProps> = ({
  stillingsId,
}) => {
  const stillingHook = useStilling(stillingsId);

  return (
    <SWRLaster hooks={[stillingHook]}>
      {(stillingsData) => (
        <Link href={`stilling/${stillingsId}`}>
          {stillingsData.stilling.title ?? 'Ukjent tittel'}
        </Link>
      )}
    </SWRLaster>
  );
};

export default KandidatlisteTittel;
