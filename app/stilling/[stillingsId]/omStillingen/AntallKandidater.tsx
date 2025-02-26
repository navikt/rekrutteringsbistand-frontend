import { PersonGroupIcon } from '@navikt/aksel-icons';
import * as React from 'react';

import TekstMedIkon from '../../../components/TekstMedIkon';
import { useStillingsContext } from '../StillingsContext';

const AntallKandidater: React.FC = () => {
  const { kandidatlisteInfo } = useStillingsContext();

  return (
    <TekstMedIkon
      tekst={`${kandidatlisteInfo?.antallKandidater ?? '-'} kandidater`}
      ikon={<PersonGroupIcon />}
    />
  );
};

export default AntallKandidater;
