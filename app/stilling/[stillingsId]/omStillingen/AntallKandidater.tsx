import { PersonGroupIcon } from '@navikt/aksel-icons';
import { Loader } from '@navikt/ds-react';
import * as React from 'react';
import { useAntallKandidater } from '../../../api/kandidat/useAntallKandidater';
import SWRLaster from '../../../components/SWRLaster';
import TekstMedIkon from '../../../components/TekstMedIkon';

export interface AntallKandidaterProps {
  kandidatlisteId: string | null;
}

const AntallKandidater: React.FC<AntallKandidaterProps> = ({
  kandidatlisteId,
}) => {
  const antallKandidaterSWR = useAntallKandidater(kandidatlisteId);

  return (
    <SWRLaster skeleton={<Loader size='xsmall' />} hook={antallKandidaterSWR}>
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
