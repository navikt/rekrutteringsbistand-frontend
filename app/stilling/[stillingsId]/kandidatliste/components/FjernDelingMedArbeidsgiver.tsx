import { slettCvFraArbeidsgiversKandidatliste } from '../../../../api/kandidat/slettCvFraArbeidsgiver';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface FjernDelingMedArbeidsgiverProps {
  kandidatlisteId: string;
  kandidatnummer: string;
  navKontor: string | null;
}

const FjernDelingMedArbeidsgiver: React.FC<FjernDelingMedArbeidsgiverProps> = ({
  kandidatlisteId,
  kandidatnummer,
  navKontor,
}) => {
  const [loading, setLoading] = React.useState(false);

  const slettCv = async () => {
    setLoading(true);
    await slettCvFraArbeidsgiversKandidatliste(
      kandidatlisteId,
      kandidatnummer,
      navKontor,
    ).finally(() => {
      setLoading(false);
    });
  };
  return (
    <Button
      loading={loading}
      icon={<MinusCircleIcon />}
      variant='tertiary'
      size='small'
      className='self-center'
      onClick={slettCv}
    >
      Fjern CV fra arbeidsgiver
    </Button>
  );
};

export default FjernDelingMedArbeidsgiver;
