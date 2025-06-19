import { RekbisError } from '../../../../../../util/rekbisError';
import { kopierStilling } from '../../../../../api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { FilesIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface KopierStillingProps {
  stillingsId: string;
}

const KopierStilling: React.FC<KopierStillingProps> = ({ stillingsId }) => {
  const [loading, setLoading] = React.useState(false);
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
