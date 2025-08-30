import { slettCvFraArbeidsgiversKandidatliste } from '@/app/api/kandidat/slettCvFraArbeidsgiver';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface FjernDelingMedArbeidsgiverProps {
  kandidatnummer: string;
  navKontor: string | null;
}

const FjernDelingMedArbeidsgiver: FC<FjernDelingMedArbeidsgiverProps> = ({
  kandidatnummer,
  navKontor,
}) => {
  const [loading, setLoading] = useState(false);
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
