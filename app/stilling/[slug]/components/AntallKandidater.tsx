import { Alert } from '@navikt/ds-react';
import SWRLaster from '../../../../components/SWRLaster';
import { useHentAntallKandidaterIStilling } from '../../../api/kandidat-api/hentAntallKandidaterIStilling';

type Props = {
  kandidatelisteId: string;
};

export const AntallKandidaterIStilling = ({ kandidatelisteId }: Props) => {
  const hook = useHentAntallKandidaterIStilling({
    kandidatlisteId: kandidatelisteId,
  });
  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <Alert variant='info'>
          Antall kandidater registrert for stillingen: {data?.antallKandidater}
        </Alert>
      )}
    </SWRLaster>
  );
};
