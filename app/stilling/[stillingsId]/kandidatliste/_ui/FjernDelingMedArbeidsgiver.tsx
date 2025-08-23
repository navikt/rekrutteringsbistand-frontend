import { slettCvFraArbeidsgiversKandidatliste } from '@/app/api/kandidat/slettCvFraArbeidsgiver';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface FjernDelingMedArbeidsgiverProps {
  kandidatnummer: string;
  navKontor: string | null;
}

const FjernDelingMedArbeidsgiver: React.FC<FjernDelingMedArbeidsgiverProps> = ({
  kandidatnummer,
  navKontor,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { reFetchKandidatliste, kandidatlisteId } = useKandidatlisteContext();

  const slettCv = async () => {
    setLoading(true);
    await slettCvFraArbeidsgiversKandidatliste(
      kandidatlisteId,
      kandidatnummer,
      navKontor,
    ).finally(() => {
      setLoading(false);
      reFetchKandidatliste();
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
