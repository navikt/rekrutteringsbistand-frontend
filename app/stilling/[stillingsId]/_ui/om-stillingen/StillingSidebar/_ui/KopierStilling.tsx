import { kopierStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { FilesIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface KopierStillingProps {
  stillingsId: string;
}

const KopierStilling: FC<KopierStillingProps> = ({ stillingsId }) => {
  const [loading, setLoading] = useState(false);
  const { visVarsel } = useApplikasjonContext();
  const onKopierStilling = async () => {
    try {
      setLoading(true);
      await kopierStilling(stillingsId);

      visVarsel({
        tekst: 'Stilling er duplisert',
        type: 'success',
      });
    } catch (error) {
      new RekbisError({
        message: 'Feil ved duplisering av stilling',
        error,
      });
      visVarsel({
        tekst: 'Feil ved duplisering av stilling',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      icon={<FilesIcon />}
      variant='secondary'
      size='small'
      loading={loading}
      onClick={onKopierStilling}
    >
      Dupliser
    </Button>
  );
};

export default KopierStilling;
