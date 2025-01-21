import { PersonGroupIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import { useAntallKandidater } from '../../../api/kandidat/useAntallKandidater';
import SWRLaster from '../../../components/SWRLaster';
import TekstMedIkon from '../../../components/TekstMedIkon';

export interface AntallKandidaterProps {
  kandidatlisteId?: string;
}

const AntallKandidater: React.FC<AntallKandidaterProps> = ({
  kandidatlisteId,
}) => {
  const antallKandidaterSWR = useAntallKandidater(kandidatlisteId);

  return (
    <SWRLaster hook={antallKandidaterSWR}>
      {(data) => (
        <TekstMedIkon
          tekst={`${data?.antallKandidater ?? '-'} kandidater`}
          ikon={<PersonGroupIcon />}
        />
      )}
    </SWRLaster>
  );
};

export default AntallKandidater;
